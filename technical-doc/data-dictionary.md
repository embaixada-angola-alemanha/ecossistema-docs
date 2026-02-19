# Data Dictionary — Ecossistema Digital

## Embaixada da República de Angola na Alemanha

---

## 1. SGC — Sistema de Gestão Consular

### 1.1 cidadao

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| nome | VARCHAR(200) | NO | | Full name |
| email | VARCHAR(150) | NO | | Email address (unique) |
| data_nascimento | DATE | NO | | Date of birth |
| nacionalidade | VARCHAR(2) | NO | | ISO 3166-1 alpha-2 country code |
| numero_passaporte | VARCHAR(20) | YES | | Passport number |
| data_emissao_passaporte | DATE | YES | | Passport issue date |
| data_validade_passaporte | DATE | YES | | Passport expiry date |
| nif | VARCHAR(20) | YES | | Tax identification number |
| telefone | VARCHAR(20) | YES | | Phone with international prefix |
| morada | VARCHAR(300) | YES | | Street address |
| codigo_postal | VARCHAR(10) | YES | | Postal code |
| cidade | VARCHAR(100) | YES | | City |
| pais | VARCHAR(2) | YES | | Country (ISO 3166-1) |
| foto_path | VARCHAR(500) | YES | | Path to photo in MinIO |
| activo | BOOLEAN | NO | true | Whether citizen is active |
| created_at | TIMESTAMP | NO | now() | Record creation timestamp |
| updated_at | TIMESTAMP | NO | now() | Last update timestamp |
| created_by | VARCHAR(100) | YES | | User who created the record |
| updated_by | VARCHAR(100) | YES | | User who last updated |

**Indexes:**
- `idx_cidadao_nome` — `lower(nome)` — name search
- `idx_cidadao_passaporte` — `numero_passaporte` — passport lookup
- `idx_cidadao_nif` — `nif WHERE nif IS NOT NULL` — NIF lookup
- `idx_cidadao_email` — `email` (unique) — email lookup

---

### 1.2 visto

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| cidadao_id | UUID | NO | | FK → cidadao.id |
| tipo | VARCHAR(20) | NO | | Visa type (enum) |
| estado | VARCHAR(20) | NO | 'RASCUNHO' | Current state (enum) |
| motivo | TEXT | YES | | Travel reason |
| data_entrada | DATE | YES | | Entry date |
| data_saida | DATE | YES | | Exit date |
| alojamento | VARCHAR(300) | YES | | Accommodation name |
| endereco_alojamento | VARCHAR(500) | YES | | Accommodation address |
| referencia | VARCHAR(20) | YES | | Auto-generated reference code |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

**Tipo enum values:** `TURISMO`, `TRABALHO`, `ESTUDO`, `NEGOCIO`, `TRANSITO`, `RESIDENCIA`, `DIPLOMATICO`

**Estado enum values:** `RASCUNHO`, `SUBMETIDO`, `EM_ANALISE`, `APROVADO`, `REJEITADO`, `EMITIDO`, `ENTREGUE`, `EXPIRADO`, `CANCELADO`

**State machine:**
```
RASCUNHO → SUBMETIDO → EM_ANALISE → APROVADO → EMITIDO → ENTREGUE
                                   → REJEITADO
                                                        → EXPIRADO
                    → CANCELADO (from any non-terminal state)
```

**Indexes:**
- `idx_visto_cidadao_estado` — `(cidadao_id, estado)`
- `idx_visto_tipo_estado` — `(tipo, estado)`

---

### 1.3 visto_timeline

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| visto_id | UUID | NO | | FK → visto.id |
| estado | VARCHAR(20) | NO | | State at this point |
| data_hora | TIMESTAMP | NO | now() | When the transition occurred |
| usuario | VARCHAR(100) | NO | | Who made the change |
| comentario | TEXT | YES | | Optional comment |

---

### 1.4 agendamento

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| cidadao_id | UUID | NO | | FK → cidadao.id |
| tipo | VARCHAR(30) | NO | | Appointment type (enum) |
| estado | VARCHAR(20) | NO | 'PENDENTE' | Current state (enum) |
| data_hora | TIMESTAMP | NO | | Appointment date and time |
| notas | TEXT | YES | | Additional notes |
| motivo_cancelamento | TEXT | YES | | Reason if cancelled |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

**Tipo enum values:** `ENTREGA_PASSAPORTE`, `PEDIDO_VISTO`, `REGISTO_CONSULAR`, `LEGALIZACAO`, `NOTARIADO`, `INFORMACAO`, `OUTRO`

**Estado enum values:** `PENDENTE`, `CONFIRMADO`, `ATENDIDO`, `CANCELADO`, `NAO_COMPARECEU`, `REAGENDADO`

**Indexes:**
- `idx_agendamento_datahora` — `data_hora`
- `idx_agendamento_cidadao_estado` — `(cidadao_id, estado)`
- `idx_agendamento_conflict` — `(data_hora, tipo, estado) WHERE estado IN ('PENDENTE','CONFIRMADO')`

---

### 1.5 processo

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| cidadao_id | UUID | NO | | FK → cidadao.id |
| tipo | VARCHAR(30) | NO | | Process type |
| estado | VARCHAR(20) | NO | | Current state |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

---

### 1.6 documento

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| processo_id | UUID | YES | | FK → processo.id |
| cidadao_id | UUID | YES | | FK → cidadao.id (direct attachment) |
| nome | VARCHAR(255) | NO | | Original filename |
| path | VARCHAR(500) | NO | | MinIO object path |
| tipo_mime | VARCHAR(100) | NO | | MIME type (application/pdf, image/jpeg) |
| tamanho | BIGINT | NO | | File size in bytes |
| tipo_documento | VARCHAR(50) | YES | | Document category |
| created_at | TIMESTAMP | NO | now() | |

**Indexes:**
- `idx_documento_processo` — `processo_id`
- `idx_documento_cidadao` — `cidadao_id`

---

### 1.7 notificacao

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| cidadao_id | UUID | NO | | FK → cidadao.id |
| titulo | VARCHAR(200) | NO | | Notification title |
| mensagem | TEXT | NO | | Notification body |
| tipo | VARCHAR(30) | YES | | Notification type |
| lida | BOOLEAN | NO | false | Read status |
| entity_type | VARCHAR(30) | YES | | Related entity (VISTO, AGENDAMENTO) |
| entity_id | UUID | YES | | Related entity ID |
| created_at | TIMESTAMP | NO | now() | |

**Indexes:**
- `idx_notificacao_cidadao_lida` — `(cidadao_id, lida)`

---

## 2. WN — Web Notícias

### 2.1 article

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| slug | VARCHAR(200) | NO | | URL-friendly identifier (unique) |
| titulo | VARCHAR(300) | NO | | Article title |
| resumo | TEXT | YES | | Article summary/excerpt |
| conteudo | TEXT | NO | | Full article body (HTML) |
| status | VARCHAR(20) | NO | 'DRAFT' | Publication status |
| author_id | UUID | YES | | Author reference |
| published_at | TIMESTAMP | YES | | Publication timestamp |
| featured_image | VARCHAR(500) | YES | | Cover image path |
| reading_time_min | INTEGER | YES | | Estimated reading time |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

**Status enum values:** `DRAFT`, `PUBLISHED`, `ARCHIVED`

**Indexes:**
- `idx_article_slug` — `slug` (unique)
- `idx_article_status_published` — `(status, published_at DESC) WHERE status = 'PUBLISHED'`
- `idx_article_fts` — GIN index on `to_tsvector('portuguese', coalesce(titulo,'') || ' ' || coalesce(resumo,''))`

### 2.2 category

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| nome | VARCHAR(100) | NO | | Category name |
| slug | VARCHAR(100) | NO | | URL-friendly name (unique) |
| descricao | TEXT | YES | | Category description |

### 2.3 tag

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| nome | VARCHAR(50) | NO | | Tag name (unique) |
| slug | VARCHAR(50) | NO | | URL-friendly name |

### 2.4 article_category (join table)

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| article_id | UUID | NO | FK → article.id |
| category_id | UUID | NO | FK → category.id |

### 2.5 article_tag (join table)

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| article_id | UUID | NO | FK → article.id |
| tag_id | UUID | NO | FK → tag.id |

### 2.6 media

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| filename | VARCHAR(255) | NO | | Original filename |
| path | VARCHAR(500) | NO | | Storage path |
| tipo_mime | VARCHAR(100) | NO | | MIME type |
| tamanho | BIGINT | NO | | File size (bytes) |
| alt_text | VARCHAR(300) | YES | | Alt text for accessibility |
| created_at | TIMESTAMP | NO | now() | |

---

## 3. SI — Site Institucional

### 3.1 page

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| slug | VARCHAR(200) | NO | | URL path (unique) |
| titulo | VARCHAR(300) | NO | | Page title |
| conteudo | TEXT | NO | | Page body (HTML) |
| status | VARCHAR(20) | NO | 'DRAFT' | Publication status |
| idioma | VARCHAR(2) | NO | 'pt' | Language code |
| meta_description | VARCHAR(300) | YES | | SEO meta description |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

### 3.2 event

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| titulo | VARCHAR(300) | NO | | Event title |
| descricao | TEXT | YES | | Event description |
| start_date | TIMESTAMP | NO | | Event start |
| end_date | TIMESTAMP | YES | | Event end |
| location | VARCHAR(300) | YES | | Event location |
| image_path | VARCHAR(500) | YES | | Cover image path |
| status | VARCHAR(20) | NO | 'DRAFT' | Publication status |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

---

## 4. GPJ — Gestão de Projectos

### 4.1 sprint

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| titulo | VARCHAR(200) | NO | | Sprint title |
| data_inicio | DATE | NO | | Start date |
| data_fim | DATE | YES | | End date |
| estado | VARCHAR(20) | NO | 'PENDENTE' | Sprint state |
| horas_planeadas | DECIMAL(6,1) | YES | | Planned hours |
| created_at | TIMESTAMP | NO | now() | |

### 4.2 task

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| sprint_id | UUID | NO | | FK → sprint.id |
| nome | VARCHAR(200) | NO | | Task name |
| descricao | TEXT | YES | | Task description |
| estado | VARCHAR(20) | NO | 'PENDENTE' | Task state |
| assignee_id | UUID | YES | | Assigned user |
| horas_planeadas | DECIMAL(5,1) | YES | | Planned hours |
| prioridade | VARCHAR(10) | YES | 'MEDIUM' | Priority |
| created_at | TIMESTAMP | NO | now() | |
| updated_at | TIMESTAMP | NO | now() | |

**Indexes:**
- `idx_task_sprint_status` — `(sprint_id, status)`
- `idx_task_assignee` — `assignee_id`

### 4.3 time_log

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| task_id | UUID | NO | | FK → task.id |
| user_id | UUID | NO | | Who logged the time |
| horas | DECIMAL(4,1) | NO | | Hours logged |
| descricao | VARCHAR(300) | YES | | What was done |
| logged_date | DATE | NO | | Date of the work |
| created_at | TIMESTAMP | NO | now() | |

**Indexes:**
- `idx_timelog_task_date` — `(task_id, logged_date)`

---

## 5. Common Audit Fields

All main entities include:

| Field | Type | Purpose |
|-------|------|---------|
| created_at | TIMESTAMP WITH TIME ZONE | Record creation time (UTC) |
| updated_at | TIMESTAMP WITH TIME ZONE | Last modification time (UTC) |
| created_by | VARCHAR(100) | Keycloak username who created |
| updated_by | VARCHAR(100) | Keycloak username who last modified |

---

## 6. Enumerations Reference

### Visa Types (TipoVisto)
| Value | Label (PT) | Label (EN) |
|-------|-----------|-----------|
| TURISMO | Turismo | Tourism |
| TRABALHO | Trabalho | Work |
| ESTUDO | Estudo | Study |
| NEGOCIO | Negócio | Business |
| TRANSITO | Trânsito | Transit |
| RESIDENCIA | Residência | Residence |
| DIPLOMATICO | Diplomático | Diplomatic |

### Visa States (EstadoVisto)
| Value | Label (PT) | Terminal? |
|-------|-----------|-----------|
| RASCUNHO | Rascunho | No |
| SUBMETIDO | Submetido | No |
| EM_ANALISE | Em Análise | No |
| APROVADO | Aprovado | No |
| REJEITADO | Rejeitado | Yes |
| EMITIDO | Emitido | No |
| ENTREGUE | Entregue | Yes |
| EXPIRADO | Expirado | Yes |
| CANCELADO | Cancelado | Yes |

### Appointment Types (TipoAgendamento)
| Value | Label (PT) |
|-------|-----------|
| ENTREGA_PASSAPORTE | Entrega de Passaporte |
| PEDIDO_VISTO | Pedido de Visto |
| REGISTO_CONSULAR | Registo Consular |
| LEGALIZACAO | Legalização |
| NOTARIADO | Notariado |
| INFORMACAO | Informação |
| OUTRO | Outro |

### Appointment States (EstadoAgendamento)
| Value | Label (PT) | Terminal? |
|-------|-----------|-----------|
| PENDENTE | Pendente | No |
| CONFIRMADO | Confirmado | No |
| ATENDIDO | Atendido | Yes |
| CANCELADO | Cancelado | Yes |
| NAO_COMPARECEU | Não Compareceu | Yes |
| REAGENDADO | Reagendado | Yes |

### Country Codes (ISO 3166-1 alpha-2)
| Code | Country |
|------|---------|
| AO | Angola |
| DE | Germany |
| PT | Portugal |
| BR | Brazil |
| MZ | Mozambique |
| CV | Cape Verde |

---

## 7. Data Retention Policy

| Data Type | Retention | Basis |
|-----------|-----------|-------|
| Citizen records | 10 years after last activity | Legal requirement |
| Visa records | 10 years | Legal requirement |
| Appointment records | 5 years | Operational |
| Documents | 10 years (linked to process) | Legal requirement |
| Notifications | 1 year | Operational |
| Articles (published) | Indefinite | Public record |
| Session data (Redis) | 30 minutes idle | Security |
| Audit logs | 5 years | Compliance |
| Backups | 30 days | Disaster recovery |
