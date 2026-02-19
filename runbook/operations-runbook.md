# Operations Runbook — Ecossistema Digital

## Embaixada da Republica de Angola na Alemanha

**Dominio:** embaixada-angola.site
**Infraestrutura:** Strato VPS com Docker Compose

---

## Referencia Rapida

| Servico | Health Check | Comando de Restart |
|---------|-------------|-------------------|
| SGC Backend | `curl https://api-sgc.embaixada-angola.site/actuator/health` | `docker compose --env-file .env.production restart sgc-backend` |
| SI Backend | `curl https://api-si.embaixada-angola.site/actuator/health` | `docker compose --env-file .env.production restart si-backend` |
| WN Backend | `curl https://api-wn.embaixada-angola.site/actuator/health` | `docker compose --env-file .env.production restart wn-backend` |
| GPJ Backend | `curl https://api-gpj.embaixada-angola.site/actuator/health` | `docker compose --env-file .env.production restart gpj-backend` |
| PostgreSQL | `docker compose --env-file .env.production exec postgres pg_isready` | `docker compose --env-file .env.production restart postgres` |
| Redis | `docker compose --env-file .env.production exec redis redis-cli ping` | `docker compose --env-file .env.production restart redis` |
| Keycloak | `curl https://auth.embaixada-angola.site/health` | `docker compose --env-file .env.production restart keycloak` |

---

## 1. Operacoes Diarias

### 1.1 Health Check Matinal (09:00)

```bash
#!/bin/bash
# daily-health-check.sh

echo "=== Ecossistema Health Check ==="
echo "Data: $(date)"
echo ""

# Verificar estado dos containers
echo "--- Estado dos Containers ---"
docker compose --env-file .env.production ps
echo ""

# Verificar saude dos servicos
echo "--- Saude dos Servicos ---"
for SVC in api-sgc api-si api-wn api-gpj; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://${SVC}.embaixada-angola.site/actuator/health")
  echo "${SVC}: HTTP ${STATUS}"
done
echo ""

# Verificar base de dados
echo "--- Base de Dados ---"
docker compose --env-file .env.production exec postgres \
  psql -U ecossistema -c "SELECT datname, numbackends FROM pg_stat_database WHERE datname LIKE '%_db';"
echo ""

# Verificar Redis
echo "--- Redis ---"
docker compose --env-file .env.production exec redis redis-cli info memory | grep used_memory_human
echo ""

# Verificar disco
echo "--- Uso de Disco ---"
df -h /
echo ""

# Verificar certificados TLS
echo "--- Certificados TLS ---"
for SUB in sgc si wn gpj api-sgc api-si api-wn api-gpj auth grafana; do
  EXPIRY=$(echo | openssl s_client -servername "${SUB}.embaixada-angola.site" -connect "${SUB}.embaixada-angola.site:443" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
  echo "${SUB}.embaixada-angola.site: expira ${EXPIRY}"
done
```

### 1.2 Dashboards Grafana a Monitorizar

| Dashboard | URL | Metricas Principais |
|-----------|-----|---------------------|
| Visao Geral | `https://grafana.embaixada-angola.site/d/overview` | CPU, memoria, estado dos containers |
| SGC Performance | `https://grafana.embaixada-angola.site/d/sgc` | Taxa de pedidos, latencia p95, taxa de erros |
| Base de Dados | `https://grafana.embaixada-angola.site/d/postgres` | Conexoes, tempo de query, cache hit ratio |
| Redis | `https://grafana.embaixada-angola.site/d/redis` | Hit rate, memoria, contagem de chaves |

---

## 2. Problemas Comuns e Resolucao

### 2.1 Container em Restart Continuo

**Sintomas:** Container reinicia repetidamente, `docker compose ps` mostra "Restarting"

**Investigacao:**
```bash
# Verificar logs do container
docker compose --env-file .env.production logs sgc-backend --tail=200

# Verificar logs anteriores ao crash
docker compose --env-file .env.production logs sgc-backend --tail=500 | head -100

# Causas comuns:
# - Base de dados inacessivel -> verificar PostgreSQL
# - Redis inacessivel -> verificar Redis
# - Keycloak inacessivel -> verificar Keycloak
# - Memoria insuficiente -> verificar limites de recursos
```

**Resolucao:**
```bash
# Se problema na base de dados:
docker compose --env-file .env.production exec postgres pg_isready
# Se nao estiver pronto, reiniciar PostgreSQL:
docker compose --env-file .env.production restart postgres

# Se problema de memoria, ajustar limites no docker-compose.yml:
# deploy:
#   resources:
#     limits:
#       memory: 2G

# Se problema de configuracao, verificar variaveis de ambiente:
docker compose --env-file .env.production config | grep -A 10 sgc-backend

# Reiniciar o servico afetado:
docker compose --env-file .env.production restart sgc-backend
```

### 2.2 Tempos de Resposta Elevados (>3s)

**Sintomas:** Alertas no Grafana, paginas lentas, queixas dos utilizadores

**Investigacao:**
```bash
# Verificar uso de recursos dos containers
docker stats --no-stream

# Verificar queries lentas na base de dados
docker compose --env-file .env.production exec postgres psql -U ecossistema -d sgc_db -c "
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active' AND now() - pg_stat_activity.query_start > interval '1 second'
ORDER BY duration DESC;"

# Verificar cache hit rate do Redis
docker compose --env-file .env.production exec redis redis-cli info stats | grep hit
```

**Resolucao:**
```bash
# Escalar manualmente se sob carga elevada
docker compose --env-file .env.production up -d --scale sgc-backend=3

# Limpar cache Redis se dados obsoletos
docker compose --env-file .env.production exec redis redis-cli FLUSHDB

# Executar VACUUM na base de dados
docker compose --env-file .env.production exec postgres psql -U ecossistema -d sgc_db -c "VACUUM ANALYZE;"
```

**Nota:** Docker Compose nao suporta auto-scaling (HPA). O ajuste de replicas e manual. Monitorizar via Grafana e ajustar conforme necessario.

### 2.3 Falhas de Login no Keycloak

**Sintomas:** Utilizadores nao conseguem iniciar sessao, erros 401/403 das APIs

**Investigacao:**
```bash
# Verificar saude do Keycloak
curl -s https://auth.embaixada-angola.site/health | jq .

# Verificar logs do Keycloak
docker compose --env-file .env.production logs keycloak --tail=100

# Verificar configuracao do realm
# Aceder a: https://auth.embaixada-angola.site/admin
# Verificar: Realm settings -> Tokens -> Access token lifespan
```

**Resolucao:**
```bash
# Se conexao a base de dados do Keycloak perdida
docker compose --env-file .env.production restart keycloak

# Se chave de assinatura de tokens foi rotacionada inesperadamente
# Todos os backends precisam reiniciar para obter o novo JWKS
docker compose --env-file .env.production restart sgc-backend si-backend wn-backend gpj-backend
```

### 2.4 Disco Cheio

**Sintomas:** Falhas de escrita, erros na base de dados, containers parados

**Investigacao:**
```bash
# Verificar uso de disco do VPS
df -h

# Verificar espaco usado por Docker
docker system df

# Verificar tamanho dos volumes
docker volume ls -q | xargs -I {} docker volume inspect {} --format '{{.Name}}: {{.Mountpoint}}' | while read vol; do
  echo "$vol $(du -sh $(echo $vol | cut -d' ' -f2) 2>/dev/null | cut -f1)"
done
```

**Resolucao:**
```bash
# Limpar imagens Docker antigas e nao utilizadas
docker image prune -a --force

# Limpar containers parados e volumes orfaos
docker system prune --volumes --force

# Limpar logs antigos dos containers
truncate -s 0 $(docker inspect --format='{{.LogPath}}' $(docker compose --env-file .env.production ps -q sgc-backend))

# Se necessario mais espaco, expandir o disco no painel Strato
```

### 2.5 Certificado TLS Expirado

**Sintomas:** Browser apresenta erro de certificado, HTTPS falha

**Investigacao:**
```bash
# Verificar validade do certificado
echo | openssl s_client -servername sgc.embaixada-angola.site -connect sgc.embaixada-angola.site:443 2>/dev/null | openssl x509 -noout -dates

# Verificar estado do Certbot
sudo certbot certificates
```

**Resolucao:**
```bash
# Renovar todos os certificados
sudo certbot renew

# Renovar certificado especifico
sudo certbot certonly --nginx -d sgc.embaixada-angola.site

# Verificar que a renovacao automatica esta configurada
sudo systemctl status certbot.timer

# Apos renovacao, recarregar o Nginx
docker compose --env-file .env.production restart nginx
# Ou se Nginx estiver fora do Docker:
sudo systemctl reload nginx
```

---

## 3. Backup e Restauro

### 3.1 Backup da Base de Dados (Diario as 02:00 UTC)

```bash
#!/bin/bash
# backup-databases.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres/${DATE}"
mkdir -p "${BACKUP_DIR}"

for DB in sgc_db si_db wn_db gpj_db keycloak_db; do
  echo "A fazer backup de ${DB}..."
  docker compose --env-file .env.production exec -T postgres \
    pg_dump -U ecossistema -Fc "${DB}" > "${BACKUP_DIR}/${DB}.dump"
  echo "  Tamanho: $(du -sh ${BACKUP_DIR}/${DB}.dump | cut -f1)"
done

# Reter ultimos 30 dias
find /backups/postgres -maxdepth 1 -mtime +30 -type d -exec rm -rf {} \;
echo "Backup completo: ${BACKUP_DIR}"
```

### 3.2 Restauro da Base de Dados

```bash
# Restaurar base de dados especifica
DB_NAME="sgc_db"
BACKUP_FILE="/backups/postgres/20260218_020000/sgc_db.dump"

# Terminar conexoes ativas, eliminar e recriar
docker compose --env-file .env.production exec postgres psql -U postgres -c "
  SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${DB_NAME}';
  DROP DATABASE IF EXISTS ${DB_NAME};
  CREATE DATABASE ${DB_NAME} OWNER ecossistema;"

# Restaurar
docker compose --env-file .env.production exec -T postgres \
  pg_restore -U ecossistema -d "${DB_NAME}" < "${BACKUP_FILE}"

# Reiniciar o backend afetado
docker compose --env-file .env.production restart sgc-backend
```

### 3.3 Backup do MinIO

```bash
#!/bin/bash
# backup-minio.sh
DATE=$(date +%Y%m%d_%H%M%S)

# Usar mc (MinIO Client) para sincronizar
mc alias set ecossistema http://localhost:9000 ecossistema "${MINIO_PASSWORD}"
mc mirror ecossistema/ "/backups/minio/${DATE}/"

# Reter ultimos 14 dias
find /backups/minio -maxdepth 1 -mtime +14 -type d -exec rm -rf {} \;
```

---

## 4. Gestao de Utilizadores (Keycloak)

### 4.1 Criar Novo Utilizador

1. Aceder a `https://auth.embaixada-angola.site/admin`
2. Selecionar o realm `ecossistema`
3. Navegar para Users -> Add user
4. Preencher: username, email, primeiro nome, apelido
5. Definir palavra-passe temporaria (separador Credentials)
6. Atribuir papeis (separador Role Mappings):
   - Oficial consular: `sgc-officer`
   - Administrador: `sgc-admin`, `gpj-admin`
   - Visualizador: `sgc-viewer`, `gpj-viewer`
7. Verificar que o utilizador consegue iniciar sessao

### 4.2 Redefinir Palavra-passe

1. Keycloak Admin -> Users -> procurar utilizador
2. Separador Credentials -> Set password
3. Ativar "Temporary" (forca alteracao no proximo login)

### 4.3 Desativar Utilizador

1. Keycloak Admin -> Users -> procurar utilizador
2. Desativar "Enabled"
3. Sessoes ativas sao imediatamente invalidadas

---

## 5. Escalamento

### 5.1 Escalamento Manual de Replicas

```bash
# Escalar replicas de um backend
docker compose --env-file .env.production up -d --scale sgc-backend=3

# Verificar replicas em execucao
docker compose --env-file .env.production ps sgc-backend

# Voltar a uma unica replica
docker compose --env-file .env.production up -d --scale sgc-backend=1
```

**Nota:** Docker Compose nao suporta Horizontal Pod Autoscaler (HPA) como Kubernetes. O ajuste de replicas e manual. Monitorizar metricas no Grafana e ajustar conforme a carga.

### 5.2 Pool de Conexoes a Base de Dados

Cada aplicacao Spring Boot utiliza HikariCP como pool de conexoes:

| Configuracao | Valor Padrao | Maximo |
|-------------|-------------|--------|
| maximumPoolSize | 10 | 20 |
| minimumIdle | 5 | 10 |
| connectionTimeout | 30s | 60s |

Ajustar via variavel de ambiente no `.env.production`:
```
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=20
```

Apos alterar, reiniciar o backend:
```bash
docker compose --env-file .env.production restart sgc-backend
```

---

## 6. Janelas de Manutencao

### Manutencao Planeada
- **Quando:** Domingos 02:00-06:00 UTC (baixo trafego)
- **Notificacao:** 48h antes via email ao pessoal da embaixada
- **Processo:**
  1. Publicar banner de manutencao em todos os frontends
  2. Realizar atualizacoes
  3. Verificar health checks
  4. Remover banner de manutencao

### Manutencao de Emergencia
- **Autorizacao:** IT Lead ou Consul
- **Processo:**
  1. Avaliar gravidade e impacto
  2. Notificar utilizadores afetados
  3. Resolver o problema
  4. Post-mortem em 24 horas

---

## 7. Contacto e Escalacao

| Nivel | Contacto | Tempo de Resposta |
|-------|----------|-------------------|
| L1 — IT Lead | Grupo WhatsApp "Ecossistema Suporte" | 30 min (horario de funcionamento) |
| L2 — Equipa Dev | support@embaixada-angola.site | 2 horas |
| L3 — Infraestrutura | support@embaixada-angola.site (prioridade alta) | 4 horas |

### Caminho de Escalacao

1. IT Lead avalia o problema
2. Se nao resolver em 1h -> escalar para Equipa Dev
3. Se problema de infraestrutura -> escalar para Infra
4. Se perda de dados ou seguranca -> notificar Consul imediatamente

### Comandos Uteis para Diagnostico Rapido

```bash
# Ver todos os containers e o seu estado
docker compose --env-file .env.production ps

# Ver logs de um servico em tempo real
docker compose --env-file .env.production logs -f sgc-backend --tail=100

# Aceder a base de dados diretamente
docker compose --env-file .env.production exec postgres psql -U ecossistema -d sgc_db

# Aceder ao Redis
docker compose --env-file .env.production exec redis redis-cli

# Reiniciar todos os servicos
docker compose --env-file .env.production restart

# Parar todos os servicos
docker compose --env-file .env.production down

# Iniciar todos os servicos
docker compose --env-file .env.production up -d
```
