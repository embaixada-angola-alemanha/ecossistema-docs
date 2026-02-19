# Guia de Administracao do Sistema — Ecossistema Digital

**Audiencia:** IT Lead
**Dominio:** embaixada-angola.site
**Ultima actualizacao:** 2026-02-19
**Versao:** 1.0

---

## Indice

- [1. Keycloak — Gestao de Identidade](#1-keycloak--gestao-de-identidade)
- [2. Docker Compose — Gestao de Servicos](#2-docker-compose--gestao-de-servicos)
- [3. Monitorizacao](#3-monitorizacao)
- [4. Backups](#4-backups)
- [5. Resolucao de Problemas](#5-resolucao-de-problemas)
- [6. Procedimentos de Emergencia](#6-procedimentos-de-emergencia)

---

## 1. Keycloak — Gestao de Identidade

### 1.1 Acesso a consola de administracao

A consola de administracao do Keycloak esta disponivel em:

```
https://auth.embaixada-angola.site
```

Utilizar as credenciais de administrador para aceder. Seleccionar o realm correspondente ao ecossistema.

### 1.2 Gestao de utilizadores (CRUD)

**Criar utilizador:**

1. Aceder a **Users > Add User**.
2. Preencher os campos: Username, Email, First Name, Last Name.
3. Activar **Email Verified** se o email foi confirmado.
4. Clicar em **Save**.
5. No separador **Credentials**, definir a palavra-passe inicial e activar **Temporary** para forcar alteracao no primeiro acesso.

**Consultar utilizador:**

1. Aceder a **Users** e utilizar o campo de pesquisa.
2. Pesquisar por nome, email ou username.

**Editar utilizador:**

1. Localizar o utilizador na lista.
2. Clicar no username para abrir os detalhes.
3. Alterar os campos necessarios e clicar em **Save**.

**Eliminar utilizador:**

1. Abrir os detalhes do utilizador.
2. Clicar em **Delete** e confirmar a accao.

### 1.3 Atribuicao de roles

O ecossistema utiliza os seguintes roles, organizados por modulo:

**Roles do Site Institucional (SI):**

| Role    | Descricao                                         |
|---------|----------------------------------------------------|
| ADMIN   | Acesso total ao sistema                            |
| CONSUL  | Gestao de servicos consulares                      |
| OFFICER | Funcionario com permissoes de gestao de conteudo   |
| CITIZEN | Cidadao com acesso limitado a servicos publicos    |
| EDITOR  | Editor de conteudo com permissoes de publicacao     |
| VIEWER  | Acesso apenas de leitura                           |

**Roles do Welwitschia Noticias (WN):**

| Role          | Descricao                                    |
|---------------|-----------------------------------------------|
| WN-ADMIN      | Administracao completa do portal de noticias  |
| WN-EDITOR     | Revisao e publicacao de artigos               |
| WN-JOURNALIST | Criacao e submissao de artigos                |

Para atribuir um role:

1. Abrir os detalhes do utilizador.
2. Aceder ao separador **Role Mappings**.
3. Em **Available Roles**, seleccionar o role desejado.
4. Clicar em **Add selected**.

### 1.4 Repor palavra-passe

1. Abrir os detalhes do utilizador.
2. Aceder ao separador **Credentials**.
3. Introduzir a nova palavra-passe.
4. Activar **Temporary** para forcar alteracao no proximo acesso.
5. Clicar em **Set Password**.

### 1.5 Desactivar contas

1. Abrir os detalhes do utilizador.
2. Desactivar o interruptor **Enabled**.
3. Clicar em **Save**.

O utilizador deixara de conseguir autenticar-se em todos os servicos do ecossistema.

---

## 2. Docker Compose — Gestao de Servicos

Todos os servicos do ecossistema sao geridos via Docker Compose. O ficheiro de configuracao de ambiente e `.env.production` (ou `.env.staging` para o ambiente de testes).

### 2.1 Esquema de portas

| Ambiente   | Gama de portas |
|------------|----------------|
| Staging    | 10xxx          |
| Production | 20xxx          |

### 2.2 Comandos de gestao

**Listar servicos em execucao:**

```bash
docker compose --env-file .env.production ps
```

**Reiniciar um servico especifico:**

```bash
docker compose --env-file .env.production restart sgc-backend
```

**Visualizar logs em tempo real:**

```bash
docker compose --env-file .env.production logs -f sgc-backend --tail=100
```

**Reconstruir e reiniciar um servico:**

```bash
docker compose --env-file .env.production up -d --build sgc-backend
```

**Parar todos os servicos:**

```bash
docker compose --env-file .env.production down
```

**Iniciar todos os servicos:**

```bash
docker compose --env-file .env.production up -d
```

**Verificar o estado de um servico especifico:**

```bash
docker compose --env-file .env.production ps sgc-backend
```

**Nota:** Substituir `sgc-backend` pelo nome do servico desejado (ex.: `si-backend`, `wn-backend`, `sgc-frontend`, `keycloak`, `postgres`).

---

## 3. Monitorizacao

### 3.1 Grafana

O Grafana esta disponivel em:

```
https://grafana.embaixada-angola.site
```

Dashboards disponiveis:

| Dashboard       | Descricao                                          |
|-----------------|-----------------------------------------------------|
| JVM             | Memoria heap, threads, garbage collection            |
| HTTP            | Latencia de pedidos, taxa de erros, throughput       |
| DB              | Conexoes activas, queries lentas, pool de conexoes   |

Utilizar os filtros no topo de cada dashboard para seleccionar o servico e o periodo temporal.

### 3.2 Prometheus

O Prometheus esta disponivel na porta 9090 do servidor:

```
http://<ip-do-servidor>:9090
```

Metricas uteis para consulta directa:

```
# Taxa de pedidos HTTP por servico
rate(http_server_requests_seconds_count[5m])

# Memoria JVM utilizada
jvm_memory_used_bytes{area="heap"}

# Conexoes activas ao PostgreSQL
hikaricp_connections_active
```

---

## 4. Backups

### 4.1 Backup automatico

O sistema executa backups automaticos diariamente as **02:00 UTC** via cron job. O processo efectua `pg_dump` de cinco bases de dados:

- `sgc_db` — Sistema de Gestao Consular
- `si_db` — Site Institucional
- `wn_db` — Welwitschia Noticias
- `gpj_db` — Gestao de Projectos
- `keycloak_db` — Autenticacao e identidade

### 4.2 Retencao

Os backups sao retidos durante **30 dias**. Ficheiros mais antigos sao eliminados automaticamente.

### 4.3 Verificar backups

```bash
ls -la /backups/postgres/
```

Cada ficheiro segue a convencao de nomenclatura: `<nome_db>_<YYYYMMDD>_<HHMMSS>.sql.gz`

### 4.4 Backup manual

Para executar um backup manual de uma base de dados especifica:

```bash
docker compose --env-file .env.production exec postgres pg_dump -U postgres -d wn_db | gzip > /backups/postgres/wn_db_$(date +%Y%m%d_%H%M%S).sql.gz
```

Substituir `wn_db` pelo nome da base de dados desejada.

---

## 5. Resolucao de Problemas

### 5.1 Servico nao inicia

**Diagnostico:**

```bash
docker compose --env-file .env.production logs sgc-backend --tail=200
```

**Causas comuns:**
- Porta ja em utilizacao por outro processo.
- Variaveis de ambiente em falta no ficheiro `.env.production`.
- Imagem Docker corrompida — reconstruir com `--build`.

**Solucao:**

```bash
docker compose --env-file .env.production up -d --build sgc-backend
```

### 5.2 Erros 502 (Bad Gateway)

O Nginx retorna 502 quando nao consegue comunicar com o servico backend.

**Diagnostico:**

```bash
docker compose --env-file .env.production ps
docker compose --env-file .env.production logs -f nginx --tail=50
```

**Solucao:**

```bash
docker compose --env-file .env.production restart nginx
```

Se o problema persistir, verificar se o servico backend correspondente esta em execucao.

### 5.3 Problemas de conexao a base de dados

**Diagnostico:**

```bash
docker compose --env-file .env.production logs postgres --tail=100
docker compose --env-file .env.production exec postgres pg_isready
```

**Causas comuns:**
- Servico PostgreSQL parado ou em reinicio.
- Pool de conexoes esgotado.
- Credenciais incorrectas no ficheiro de ambiente.

**Solucao:**

```bash
docker compose --env-file .env.production restart postgres
```

Aguardar 30 segundos e reiniciar os servicos backend que dependem da base de dados.

### 5.4 Problemas com tokens Keycloak

Se os utilizadores reportam erros de autenticacao ou tokens invalidos:

**Diagnostico:**

```bash
docker compose --env-file .env.production logs keycloak --tail=100
```

**Solucao:**

```bash
docker compose --env-file .env.production restart keycloak
```

Apos o reinicio do Keycloak, reiniciar os servicos backend para forcar a renovacao dos tokens:

```bash
docker compose --env-file .env.production restart sgc-backend si-backend wn-backend
```

### 5.5 Disco cheio

**Diagnostico:**

```bash
df -h
du -sh /backups/postgres/
du -sh /data/media/
```

**Solucao:**

Limpar backups antigos:

```bash
find /backups/postgres/ -name "*.sql.gz" -mtime +30 -delete
```

Limpar imagens Docker nao utilizadas:

```bash
docker image prune -a --filter "until=720h"
```

---

## 6. Procedimentos de Emergencia

### 6.1 Rollback de deployment

Para reverter para a versao anterior de um servico:

```bash
# Parar o servico actual
docker compose --env-file .env.production stop sgc-backend

# Identificar a imagem anterior
docker images | grep sgc-backend

# Alterar a tag da imagem no docker-compose.yml para a versao anterior
# Exemplo: image: sgc-backend:v1.2.0 -> image: sgc-backend:v1.1.0

# Reiniciar com a versao anterior
docker compose --env-file .env.production up -d sgc-backend
```

Verificar o funcionamento apos o rollback:

```bash
docker compose --env-file .env.production logs -f sgc-backend --tail=50
```

### 6.2 Restaurar base de dados a partir de backup

```bash
# Identificar o ficheiro de backup
ls -la /backups/postgres/ | grep wn_db

# Parar o servico que utiliza a base de dados
docker compose --env-file .env.production stop wn-backend

# Restaurar o backup
gunzip -c /backups/postgres/wn_db_20260219_020000.sql.gz | docker compose --env-file .env.production exec -T postgres psql -U postgres -d wn_db

# Reiniciar o servico
docker compose --env-file .env.production start wn-backend
```

**Nota:** Substituir o nome do ficheiro de backup pela data correcta. Todos os dados inseridos apos a data do backup serao perdidos.

### 6.3 Desactivar conta comprometida

Em caso de suspeita de comprometimento de uma conta:

1. Aceder imediatamente a consola Keycloak em `https://auth.embaixada-angola.site`.
2. Localizar o utilizador:

```
Users > pesquisar por username ou email
```

3. Desactivar a conta:
   - Desactivar o interruptor **Enabled**.
   - Clicar em **Save**.

4. Terminar todas as sessoes activas:
   - Aceder ao separador **Sessions**.
   - Clicar em **Logout all sessions**.

5. Revogar tokens activos:
   - Aceder ao separador **Consents**.
   - Revogar todas as autorizacoes.

6. Documentar o incidente:
   - Registar a data, hora e accoes tomadas.
   - Notificar o responsavel de seguranca.
   - Analisar os logs para determinar o alcance do comprometimento:

```bash
docker compose --env-file .env.production logs keycloak --since="2026-02-19T00:00:00" | grep "<username>"
```

---

*Fim do guia. Para questoes adicionais, contactar a equipa de desenvolvimento.*
