# Deployment Guide — Ecossistema Digital

## Embaixada da República de Angola na Alemanha

---

## 1. Prerequisites

### Server Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 4 cores | 8 cores |
| RAM | 16 GB | 32 GB |
| Storage | 100 GB SSD | 250 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS |
| Network | 100 Mbps | 1 Gbps |

### Software Requirements

| Software | Version | Purpose |
|----------|---------|---------|
| Docker | 25.x | Container runtime |
| K3s | 1.30.x | Kubernetes distribution |
| kubectl | 1.30.x | Kubernetes CLI |
| Helm | 3.14.x | Package manager |
| cert-manager | 1.14.x | TLS certificates |

### Domain Configuration

| Domain | Points To | Service |
|--------|----------|---------|
| sgc.embaixada-angola.site | Ingress IP | SGC Frontend |
| si.embaixada-angola.site | Ingress IP | SI Frontend |
| wn.embaixada-angola.site | Ingress IP | WN Frontend |
| gpj.embaixada-angola.site | Ingress IP | GPJ Frontend |
| api-sgc.embaixada-angola.site | Ingress IP | SGC Backend |
| api-si.embaixada-angola.site | Ingress IP | SI Backend |
| api-wn.embaixada-angola.site | Ingress IP | WN Backend |
| api-gpj.embaixada-angola.site | Ingress IP | GPJ Backend |
| auth.embaixada-angola.site | Ingress IP | Keycloak |
| grafana.embaixada-angola.site | Ingress IP | Monitoring |

---

## 2. Initial Setup

### 2.1 Install K3s

```bash
# Install K3s (single node)
curl -sfL https://get.k3s.io | sh -s - \
  --disable traefik \
  --write-kubeconfig-mode 644

# Verify installation
kubectl get nodes
kubectl get pods -A
```

### 2.2 Install Traefik (Ingress Controller)

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update

helm install traefik traefik/traefik \
  --namespace ingress \
  --create-namespace \
  --set service.type=LoadBalancer \
  --set ingressRoute.dashboard.enabled=false
```

### 2.3 Install cert-manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true

# Create Let's Encrypt ClusterIssuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@embaixada-angola.site
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
EOF
```

### 2.4 Create Namespaces

```bash
kubectl create namespace ecossistema-prod
kubectl create namespace ecossistema-infra
kubectl create namespace keycloak
kubectl create namespace monitoring
```

---

## 3. Infrastructure Services

### 3.1 PostgreSQL

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami

helm install postgres bitnami/postgresql \
  --namespace ecossistema-infra \
  --set auth.postgresPassword="${PG_ADMIN_PASSWORD}" \
  --set primary.persistence.size=50Gi \
  --set primary.resources.requests.memory=1Gi \
  --set primary.resources.requests.cpu=500m

# Create databases
kubectl exec -it postgres-postgresql-0 -n ecossistema-infra -- psql -U postgres <<EOF
CREATE DATABASE sgc_db;
CREATE DATABASE si_db;
CREATE DATABASE wn_db;
CREATE DATABASE gpj_db;
CREATE DATABASE keycloak_db;
CREATE USER ecossistema WITH ENCRYPTED PASSWORD '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE sgc_db TO ecossistema;
GRANT ALL PRIVILEGES ON DATABASE si_db TO ecossistema;
GRANT ALL PRIVILEGES ON DATABASE wn_db TO ecossistema;
GRANT ALL PRIVILEGES ON DATABASE gpj_db TO ecossistema;
EOF
```

### 3.2 Redis

```bash
helm install redis bitnami/redis \
  --namespace ecossistema-infra \
  --set auth.password="${REDIS_PASSWORD}" \
  --set master.persistence.size=5Gi \
  --set replica.replicaCount=0
```

### 3.3 RabbitMQ

```bash
helm install rabbitmq bitnami/rabbitmq \
  --namespace ecossistema-infra \
  --set auth.username=ecossistema \
  --set auth.password="${RABBITMQ_PASSWORD}" \
  --set persistence.size=10Gi
```

### 3.4 MinIO

```bash
helm repo add minio https://charts.min.io/

helm install minio minio/minio \
  --namespace ecossistema-infra \
  --set rootUser=ecossistema \
  --set rootPassword="${MINIO_PASSWORD}" \
  --set persistence.size=50Gi \
  --set mode=standalone
```

### 3.5 Keycloak

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami

helm install keycloak bitnami/keycloak \
  --namespace keycloak \
  --set auth.adminUser=admin \
  --set auth.adminPassword="${KC_ADMIN_PASSWORD}" \
  --set postgresql.enabled=false \
  --set externalDatabase.host=postgres-postgresql.ecossistema-infra.svc \
  --set externalDatabase.database=keycloak_db \
  --set externalDatabase.user=ecossistema \
  --set externalDatabase.password="${DB_PASSWORD}"
```

After deployment, configure Keycloak:
1. Create realm `ecossistema`
2. Create clients: `sgc-app`, `gpj-app`, `mobile-app`, `public-web`
3. Configure PKCE for all clients
4. Create roles: `sgc-admin`, `sgc-officer`, `sgc-viewer`, `gpj-admin`, `gpj-member`, `gpj-viewer`
5. Create initial admin users

---

## 4. Application Deployment

### 4.1 Secrets

```bash
# Create application secrets
kubectl create secret generic ecossistema-secrets \
  --namespace ecossistema-prod \
  --from-literal=db-password="${DB_PASSWORD}" \
  --from-literal=redis-password="${REDIS_PASSWORD}" \
  --from-literal=rabbitmq-password="${RABBITMQ_PASSWORD}" \
  --from-literal=minio-password="${MINIO_PASSWORD}" \
  --from-literal=keycloak-client-secret="${KC_CLIENT_SECRET}"
```

### 4.2 Backend Deployments

Each backend follows the same pattern. Example for SGC:

```yaml
# sgc-backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sgc-backend
  namespace: ecossistema-prod
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sgc-backend
  template:
    metadata:
      labels:
        app: sgc-backend
    spec:
      containers:
      - name: sgc-backend
        image: ghcr.io/embaixada-angola/sgc-backend:latest
        ports:
        - containerPort: 8081
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: SPRING_DATASOURCE_URL
          value: "jdbc:postgresql://postgres-postgresql.ecossistema-infra.svc:5432/sgc_db"
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: ecossistema-secrets
              key: db-password
        - name: SPRING_DATA_REDIS_HOST
          value: "redis-master.ecossistema-infra.svc"
        - name: KEYCLOAK_ISSUER_URI
          value: "https://auth.embaixada-angola.site/realms/ecossistema"
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8081
          initialDelaySeconds: 30
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8081
          initialDelaySeconds: 60
          periodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: sgc-backend
  namespace: ecossistema-prod
spec:
  selector:
    app: sgc-backend
  ports:
  - port: 8081
    targetPort: 8081
```

Repeat for SI (port 8082), WN (port 8083), GPJ (port 8084).

### 4.3 Frontend Deployments

```yaml
# sgc-frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sgc-frontend
  namespace: ecossistema-prod
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sgc-frontend
  template:
    metadata:
      labels:
        app: sgc-frontend
    spec:
      containers:
      - name: sgc-frontend
        image: ghcr.io/embaixada-angola/sgc-frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "200m"
```

### 4.4 Ingress Routes

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecossistema-ingress
  namespace: ecossistema-prod
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - sgc.embaixada-angola.site
    - si.embaixada-angola.site
    - wn.embaixada-angola.site
    - gpj.embaixada-angola.site
    - api-sgc.embaixada-angola.site
    - api-si.embaixada-angola.site
    - api-wn.embaixada-angola.site
    - api-gpj.embaixada-angola.site
    secretName: ecossistema-tls
  rules:
  - host: sgc.embaixada-angola.site
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: sgc-frontend
            port:
              number: 80
  - host: api-sgc.embaixada-angola.site
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: sgc-backend
            port:
              number: 8081
  # ... repeat for SI, WN, GPJ
```

---

## 5. Monitoring Setup

### 5.1 Prometheus + Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.adminPassword="${GRAFANA_PASSWORD}" \
  --set grafana.persistence.enabled=true \
  --set grafana.persistence.size=10Gi \
  --set prometheus.prometheusSpec.retention=30d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi
```

### 5.2 Loki (Log Aggregation)

```bash
helm repo add grafana https://grafana.github.io/helm-charts

helm install loki grafana/loki-stack \
  --namespace monitoring \
  --set loki.persistence.enabled=true \
  --set loki.persistence.size=50Gi \
  --set promtail.enabled=true
```

---

## 6. ArgoCD Setup

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Create application for each service
argocd app create sgc-backend \
  --repo https://github.com/embaixada-angola/ecossistema-sgc-backend.git \
  --path k8s \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace ecossistema-prod \
  --sync-policy automated
```

---

## 7. Post-Deployment Verification

```bash
# 1. Check all pods running
kubectl get pods -n ecossistema-prod
kubectl get pods -n ecossistema-infra
kubectl get pods -n keycloak
kubectl get pods -n monitoring

# 2. Check health endpoints
for SVC in sgc:8081 si:8082 wn:8083 gpj:8084; do
  NAME=$(echo $SVC | cut -d: -f1)
  PORT=$(echo $SVC | cut -d: -f2)
  echo "$NAME: $(kubectl exec -n ecossistema-prod deploy/${NAME}-backend -- curl -s http://localhost:${PORT}/actuator/health | jq -r .status)"
done

# 3. Check ingress
kubectl get ingress -n ecossistema-prod

# 4. Check TLS certificates
kubectl get certificates -n ecossistema-prod

# 5. Verify external access
for DOMAIN in sgc si wn gpj; do
  curl -sI "https://${DOMAIN}.embaixada-angola.site" | head -1
done
```

---

## 8. Rollback Procedure

```bash
# Rollback deployment to previous version
kubectl rollout undo deployment/sgc-backend -n ecossistema-prod

# Rollback to specific revision
kubectl rollout undo deployment/sgc-backend -n ecossistema-prod --to-revision=3

# Check rollout history
kubectl rollout history deployment/sgc-backend -n ecossistema-prod

# Rollback database migration (Flyway)
# NOTE: Flyway undo requires Flyway Teams edition
# Alternative: restore from backup
pg_restore -h postgres-host -d sgc_db -U ecossistema backup_before_deploy.dump
```

---

## 9. Environment Variables Reference

| Variable | Service | Description |
|----------|---------|-------------|
| SPRING_PROFILES_ACTIVE | All backends | `prod`, `staging`, `test` |
| SPRING_DATASOURCE_URL | All backends | PostgreSQL JDBC URL |
| SPRING_DATASOURCE_PASSWORD | All backends | Database password |
| SPRING_DATA_REDIS_HOST | All backends | Redis hostname |
| SPRING_DATA_REDIS_PASSWORD | All backends | Redis password |
| SPRING_RABBITMQ_HOST | SGC, SI, WN | RabbitMQ hostname |
| MINIO_ENDPOINT | SGC | MinIO URL |
| MINIO_ACCESS_KEY | SGC | MinIO access key |
| MINIO_SECRET_KEY | SGC | MinIO secret key |
| KEYCLOAK_ISSUER_URI | All backends | Keycloak realm URL |
| KEYCLOAK_CLIENT_SECRET | All backends | OIDC client secret |
