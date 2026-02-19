# Operations Runbook — Ecossistema Digital

## Embaixada da República de Angola na Alemanha

---

## Quick Reference

| Service | Health Check | Restart Command |
|---------|-------------|-----------------|
| SGC Backend | `curl https://api-sgc.embaixada-angola.de/actuator/health` | `kubectl rollout restart deploy/sgc-backend -n ecossistema-prod` |
| SI Backend | `curl https://api-si.embaixada-angola.de/actuator/health` | `kubectl rollout restart deploy/si-backend -n ecossistema-prod` |
| WN Backend | `curl https://api-wn.embaixada-angola.de/actuator/health` | `kubectl rollout restart deploy/wn-backend -n ecossistema-prod` |
| GPJ Backend | `curl https://api-gpj.embaixada-angola.de/actuator/health` | `kubectl rollout restart deploy/gpj-backend -n ecossistema-prod` |
| PostgreSQL | `kubectl exec postgres-postgresql-0 -n ecossistema-infra -- pg_isready` | `kubectl rollout restart sts/postgres-postgresql -n ecossistema-infra` |
| Redis | `kubectl exec redis-master-0 -n ecossistema-infra -- redis-cli ping` | `kubectl rollout restart sts/redis-master -n ecossistema-infra` |
| Keycloak | `curl https://auth.embaixada-angola.de/health` | `kubectl rollout restart deploy/keycloak -n keycloak` |

---

## 1. Daily Operations

### 1.1 Morning Health Check (09:00)

```bash
#!/bin/bash
# daily-health-check.sh

echo "=== Ecossistema Health Check ==="
echo "Date: $(date)"
echo ""

# Check pods
echo "--- Pod Status ---"
kubectl get pods -n ecossistema-prod -o wide
echo ""

# Check services health
for SVC in api-sgc api-si api-wn api-gpj; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://${SVC}.embaixada-angola.de/actuator/health")
  echo "${SVC}: HTTP ${STATUS}"
done
echo ""

# Check database
echo "--- Database ---"
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- \
  psql -U ecossistema -c "SELECT datname, numbackends FROM pg_stat_database WHERE datname LIKE '%_db';"
echo ""

# Check Redis
echo "--- Redis ---"
kubectl exec redis-master-0 -n ecossistema-infra -- redis-cli info memory | grep used_memory_human
echo ""

# Check disk
echo "--- Disk Usage ---"
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- df -h /bitnami/postgresql
echo ""

# Check certificates
echo "--- TLS Certificates ---"
kubectl get certificates -n ecossistema-prod -o custom-columns="NAME:.metadata.name,READY:.status.conditions[0].status,EXPIRY:.status.notAfter"
```

### 1.2 Grafana Dashboards to Monitor

| Dashboard | URL | Key Metrics |
|-----------|-----|-------------|
| System Overview | /d/overview | CPU, memory, pod status |
| SGC Performance | /d/sgc | Request rate, latency p95, error rate |
| Database | /d/postgres | Connections, query time, cache hit ratio |
| Redis | /d/redis | Hit rate, memory, keys count |

---

## 2. Common Issues & Resolution

### 2.1 Backend Pod CrashLoopBackOff

**Symptoms:** Pod restarts repeatedly, `kubectl get pods` shows CrashLoopBackOff

**Investigation:**
```bash
# Check logs
kubectl logs deploy/sgc-backend -n ecossistema-prod --previous

# Check events
kubectl describe pod <pod-name> -n ecossistema-prod

# Common causes:
# - Database unreachable → check PostgreSQL
# - Redis unreachable → check Redis
# - Keycloak unreachable → check Keycloak
# - Out of memory → check resource limits
```

**Resolution:**
```bash
# If database issue:
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- pg_isready
# If not ready, restart PostgreSQL

# If memory issue, increase limits:
kubectl set resources deploy/sgc-backend -n ecossistema-prod --limits=memory=2Gi

# If config issue, check env vars:
kubectl describe deploy/sgc-backend -n ecossistema-prod | grep -A 5 "Environment"
```

### 2.2 High Response Times (>3s)

**Symptoms:** Grafana alerts, slow page loads, user complaints

**Investigation:**
```bash
# Check pod resource usage
kubectl top pods -n ecossistema-prod

# Check database slow queries
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- psql -U ecossistema -d sgc_db -c "
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active' AND now() - pg_stat_activity.query_start > interval '1 second'
ORDER BY duration DESC;"

# Check Redis cache hit rate
kubectl exec redis-master-0 -n ecossistema-infra -- redis-cli info stats | grep hit

# Check if replica count is sufficient
kubectl get hpa -n ecossistema-prod
```

**Resolution:**
```bash
# Scale up if under heavy load
kubectl scale deploy/sgc-backend -n ecossistema-prod --replicas=3

# Clear Redis cache if stale
kubectl exec redis-master-0 -n ecossistema-infra -- redis-cli FLUSHDB

# Run VACUUM on database
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- psql -U ecossistema -d sgc_db -c "VACUUM ANALYZE;"
```

### 2.3 Keycloak Login Failures

**Symptoms:** Users cannot log in, 401/403 errors from APIs

**Investigation:**
```bash
# Check Keycloak health
curl -s https://auth.embaixada-angola.de/health | jq .

# Check Keycloak logs
kubectl logs deploy/keycloak -n keycloak --tail=100

# Check realm configuration
# Login to Keycloak admin: https://auth.embaixada-angola.de/admin
# Verify: Realm settings → Tokens → Access token lifespan
```

**Resolution:**
```bash
# If Keycloak DB connection lost
kubectl rollout restart deploy/keycloak -n keycloak

# If token signing key rotated unexpectedly
# All backends need restart to fetch new JWKS
kubectl rollout restart deploy/sgc-backend deploy/si-backend deploy/wn-backend deploy/gpj-backend -n ecossistema-prod
```

### 2.4 Disk Full

**Symptoms:** Write failures, database errors, pod evictions

**Investigation:**
```bash
# Check PVC usage
kubectl get pvc -A -o custom-columns="NAMESPACE:.metadata.namespace,NAME:.metadata.name,SIZE:.spec.resources.requests.storage"

# Check actual disk usage
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- df -h
kubectl exec minio-0 -n ecossistema-infra -- df -h
```

**Resolution:**
```bash
# Clean old WAL files (PostgreSQL)
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- psql -U postgres -c "SELECT pg_switch_wal();"

# Clean old Docker images
sudo docker image prune -a --force

# Expand PVC (if storage class supports it)
kubectl edit pvc postgres-postgresql -n ecossistema-infra
# Change: storage: 50Gi → storage: 100Gi
```

### 2.5 TLS Certificate Expired

**Symptoms:** Browser shows certificate error, HTTPS fails

**Investigation:**
```bash
# Check certificate status
kubectl get certificates -n ecossistema-prod
kubectl describe certificate ecossistema-tls -n ecossistema-prod

# Check cert-manager logs
kubectl logs deploy/cert-manager -n cert-manager --tail=50
```

**Resolution:**
```bash
# Force certificate renewal
kubectl delete certificate ecossistema-tls -n ecossistema-prod
# cert-manager will automatically recreate it

# If cert-manager is broken
kubectl rollout restart deploy/cert-manager -n cert-manager
```

---

## 3. Backup & Restore

### 3.1 Database Backup (Daily at 02:00 UTC)

```bash
#!/bin/bash
# backup-databases.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres/${DATE}"
mkdir -p "${BACKUP_DIR}"

for DB in sgc_db si_db wn_db gpj_db keycloak_db; do
  echo "Backing up ${DB}..."
  kubectl exec postgres-postgresql-0 -n ecossistema-infra -- \
    pg_dump -U ecossistema -Fc "${DB}" > "${BACKUP_DIR}/${DB}.dump"
  echo "  Size: $(du -sh ${BACKUP_DIR}/${DB}.dump | cut -f1)"
done

# Retain last 30 days
find /backups/postgres -maxdepth 1 -mtime +30 -type d -exec rm -rf {} \;
echo "Backup complete: ${BACKUP_DIR}"
```

### 3.2 Database Restore

```bash
# Restore specific database
DB_NAME="sgc_db"
BACKUP_FILE="/backups/postgres/20260218_020000/sgc_db.dump"

# Drop and recreate
kubectl exec postgres-postgresql-0 -n ecossistema-infra -- psql -U postgres -c "
  SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${DB_NAME}';
  DROP DATABASE IF EXISTS ${DB_NAME};
  CREATE DATABASE ${DB_NAME} OWNER ecossistema;"

# Restore
kubectl exec -i postgres-postgresql-0 -n ecossistema-infra -- \
  pg_restore -U ecossistema -d "${DB_NAME}" < "${BACKUP_FILE}"

# Restart affected backend
kubectl rollout restart deploy/sgc-backend -n ecossistema-prod
```

### 3.3 MinIO Backup

```bash
#!/bin/bash
# backup-minio.sh
DATE=$(date +%Y%m%d_%H%M%S)

# Use mc (MinIO Client) to sync
mc alias set ecossistema https://minio.ecossistema-infra.svc:9000 ecossistema "${MINIO_PASSWORD}"
mc mirror ecossistema/ "/backups/minio/${DATE}/"

# Retain last 14 days
find /backups/minio -maxdepth 1 -mtime +14 -type d -exec rm -rf {} \;
```

---

## 4. User Management (Keycloak)

### 4.1 Create New User

1. Login to https://auth.embaixada-angola.de/admin
2. Select realm `ecossistema`
3. Navigate to Users → Add user
4. Fill: username, email, first name, last name
5. Set temporary password (Credentials tab)
6. Assign roles (Role Mappings tab):
   - Consular officer: `sgc-officer`
   - Administrator: `sgc-admin`, `gpj-admin`
   - Viewer: `sgc-viewer`, `gpj-viewer`
7. Verify user can log in

### 4.2 Reset User Password

1. Keycloak Admin → Users → search user
2. Credentials tab → Set password
3. Toggle "Temporary" to ON (forces change on next login)

### 4.3 Disable User

1. Keycloak Admin → Users → search user
2. Toggle "Enabled" to OFF
3. Active sessions are immediately invalidated

---

## 5. Scaling

### 5.1 Horizontal Scaling

```bash
# Scale backend replicas
kubectl scale deploy/sgc-backend -n ecossistema-prod --replicas=3

# Set up HPA (auto-scaling)
kubectl autoscale deploy/sgc-backend -n ecossistema-prod \
  --min=2 --max=5 --cpu-percent=70
```

### 5.2 Database Connection Pool

Each backend Spring Boot application has a HikariCP connection pool:

| Setting | Default | Max |
|---------|---------|-----|
| maximumPoolSize | 10 | 20 |
| minimumIdle | 5 | 10 |
| connectionTimeout | 30s | 60s |

Adjust via environment variable:
```
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=20
```

---

## 6. Maintenance Windows

### Planned Maintenance
- **When:** Sundays 02:00-06:00 UTC (low traffic)
- **Notify:** 48h before via email to embassy staff
- **Process:**
  1. Post maintenance banner on all frontends
  2. Perform updates
  3. Verify health checks
  4. Remove maintenance banner

### Emergency Maintenance
- **Authorization:** IT Lead or Consul
- **Process:**
  1. Assess severity and impact
  2. Notify affected users
  3. Fix issue
  4. Post-mortem within 24h

---

## 7. Contact & Escalation

| Level | Contact | Response Time |
|-------|---------|--------------|
| L1 — IT Lead | it@embaixada-angola.de | 30 min (business hours) |
| L2 — Dev Team | dev@embaixada-angola.de | 2 hours |
| L3 — Infrastructure | infra@embaixada-angola.de | 4 hours |

### Escalation Path
1. IT Lead assesses the issue
2. If cannot resolve in 1h → escalate to Dev Team
3. If infrastructure issue → escalate to Infra
4. If data loss or security → notify Consul immediately
