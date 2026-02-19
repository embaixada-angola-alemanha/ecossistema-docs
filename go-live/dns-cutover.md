# Procedimento de Corte DNS — Ecossistema Digital

## Embaixada da Republica de Angola na Alemanha

---

## Estado Atual

- **Dominio ativo:** botschaftangola.de (alojado em WordPress)
- **Novo dominio:** embaixada-angola.site
- **Servidor de destino:** Strato VPS (IP: `<VPS_IP>`)
- **Infraestrutura:** Docker Compose com Nginx reverse proxy e Certbot

---

## Pre-requisitos

- [ ] VPS Strato em funcionamento e acessivel via SSH
- [ ] Todos os servicos Docker saudaveis: `docker compose --env-file .env.production ps`
- [ ] Certificados TLS emitidos via Certbot para todos os subdominios
- [ ] Acesso ao painel DNS da Strato com credenciais validas
- [ ] Acesso ao painel DNS do dominio botschaftangola.de (para redirect posterior)
- [ ] Equipa de suporte disponivel durante o procedimento

---

## Passo 1: Reduzir TTL (T-48h)

Dois dias antes do corte, reduzir o TTL de todos os registos DNS para permitir propagacao rapida.

No painel DNS da Strato para embaixada-angola.site:

- Alterar TTL de todos os registos para **300 segundos** (5 minutos)
- Aguardar 48 horas para que o TTL antigo expire em todos os caches

**Verificacao:**
```bash
dig +short embaixada-angola.site | head -1
# Confirmar que o TTL retornado e <= 300
dig embaixada-angola.site | grep -i ttl
```

---

## Passo 2: Criar Registos DNS no Painel Strato

Aceder ao painel DNS da Strato e criar os seguintes registos A, todos a apontar para `<VPS_IP>`:

### Subdominios de Producao

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | embaixada-angola.site | `<VPS_IP>` | 300 |
| A | sgc.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | si.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | wn.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | gpj.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | api-sgc.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | api-si.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | api-wn.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | api-gpj.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | auth.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | grafana.embaixada-angola.site | `<VPS_IP>` | 300 |

### Subdominios de Staging

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | stg-sgc.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-si.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-wn.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-gpj.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-api-sgc.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-api-si.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-api-wn.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-api-gpj.embaixada-angola.site | `<VPS_IP>` | 300 |
| A | stg-auth.embaixada-angola.site | `<VPS_IP>` | 300 |

---

## Passo 3: Verificar Propagacao DNS

Aguardar 5-10 minutos apos a criacao dos registos e verificar a propagacao:

```bash
# Verificar cada subdominio
for SUB in "" sgc si wn gpj api-sgc api-si api-wn api-gpj auth grafana; do
  if [ -z "$SUB" ]; then
    HOST="embaixada-angola.site"
  else
    HOST="${SUB}.embaixada-angola.site"
  fi
  IP=$(dig +short "$HOST")
  echo "${HOST}: ${IP}"
done
```

**Resultado esperado:** Todos os subdominios devem resolver para `<VPS_IP>`.

Se algum subdominio nao resolver, verificar no painel DNS e aguardar mais alguns minutos.

---

## Passo 4: Verificar Certificados TLS

```bash
# Verificar TLS em cada subdominio
for SUB in sgc si wn gpj api-sgc api-si api-wn api-gpj auth grafana; do
  echo "--- ${SUB}.embaixada-angola.site ---"
  curl -vI "https://${SUB}.embaixada-angola.site" 2>&1 | grep "SSL certificate"
done
```

**Resultado esperado:** Cada subdominio deve apresentar um certificado SSL valido.

Caso algum certificado falhe, renovar com Certbot:
```bash
sudo certbot certonly --nginx -d sgc.embaixada-angola.site
```

---

## Passo 5: Testar Todos os Endpoints

```bash
# Testar health de todos os backends
for SVC in api-sgc api-si api-wn api-gpj; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://${SVC}.embaixada-angola.site/actuator/health")
  echo "${SVC}.embaixada-angola.site: HTTP ${STATUS}"
done

# Testar Keycloak
curl -s -o /dev/null -w "auth: HTTP %{http_code}\n" "https://auth.embaixada-angola.site/health"

# Testar frontends
for FE in sgc si wn gpj; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://${FE}.embaixada-angola.site")
  echo "${FE}.embaixada-angola.site: HTTP ${STATUS}"
done
```

**Resultado esperado:** Todos os endpoints devem retornar HTTP 200.

---

## Passo 6: Restaurar TTL (T+48h)

Apos 48 horas de funcionamento estavel, restaurar o TTL para o valor normal:

- Alterar TTL de todos os registos DNS para **3600 segundos** (1 hora)
- Verificar com `dig` que o novo TTL esta aplicado

---

## Redirect do Dominio Antigo

Configurar botschaftangola.de para redirecionar permanentemente para o novo dominio:

### Opcao 1: Redirect via registar DNS (se suportado)

Configurar redirect 301 no painel do registar de botschaftangola.de:
- `botschaftangola.de` -> `https://embaixada-angola.site` (301 Permanent)
- `www.botschaftangola.de` -> `https://embaixada-angola.site` (301 Permanent)

### Opcao 2: Redirect via servidor web

Se o WordPress ainda estiver ativo, adicionar no `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?botschaftangola\.de$ [NC]
RewriteRule ^(.*)$ https://embaixada-angola.site/$1 [R=301,L]
```

### Verificacao do Redirect

```bash
curl -I https://botschaftangola.de
# Resultado esperado: HTTP/1.1 301 Moved Permanently
# Location: https://embaixada-angola.site
```

---

## Contactos de Emergencia Durante o Corte

| Papel | Contacto |
|-------|----------|
| IT Lead | Grupo WhatsApp "Ecossistema Suporte" |
| Equipa Dev | support@embaixada-angola.site |
| Strato Suporte | Painel de cliente Strato |
