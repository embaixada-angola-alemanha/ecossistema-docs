# API Reference — Ecossistema Digital

## Authentication

All API endpoints (except public ones) require a Bearer JWT token from Keycloak.

```
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

### Token Acquisition

```bash
# Client credentials (service-to-service)
curl -X POST https://auth.embaixada-angola.de/realms/ecossistema/protocol/openid-connect/token \
  -d "grant_type=client_credentials" \
  -d "client_id=sgc-app" \
  -d "client_secret=${CLIENT_SECRET}"

# Authorization Code + PKCE (frontend/mobile)
# Redirect to: /realms/ecossistema/protocol/openid-connect/auth
#   ?response_type=code
#   &client_id=mobile-app
#   &redirect_uri=embaixada://callback
#   &code_challenge=${CHALLENGE}
#   &code_challenge_method=S256
```

### Token Claims

```json
{
  "sub": "user-uuid",
  "email": "user@embaixada.de",
  "preferred_username": "jsilva",
  "realm_access": {
    "roles": ["sgc-admin", "gpj-viewer"]
  },
  "exp": 1709280000
}
```

---

## Common Patterns

### Pagination

```
GET /api/v1/cidadaos?page=0&size=20&sort=nome,asc
```

Response:
```json
{
  "content": [...],
  "totalElements": 150,
  "totalPages": 8,
  "number": 0,
  "size": 20,
  "first": true,
  "last": false
}
```

### Error Response

```json
{
  "error": "Bad Request",
  "message": "Email is required",
  "status": 400,
  "timestamp": "2026-02-18T10:30:00Z",
  "path": "/api/v1/cidadaos",
  "fieldErrors": [
    { "field": "email", "message": "must not be blank" }
  ]
}
```

### HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/expired token |
| 403 | Forbidden | Insufficient role |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry, booking conflict |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server bug |

---

## SGC API (port 8081)

### Cidadão

#### List Cidadãos
```
GET /api/v1/cidadaos?page=0&size=20&search=Silva&sort=nome,asc
```
**Roles:** ADMIN, OFFICER, VIEWER

Response: Paginated list of cidadãos

#### Create Cidadão
```
POST /api/v1/cidadaos
Content-Type: application/json

{
  "nome": "João da Silva",
  "email": "joao@example.com",
  "dataNascimento": "1985-03-15",
  "nacionalidade": "AO",
  "numeroPassaporte": "N12345678",
  "dataEmissaoPassaporte": "2023-01-10",
  "dataValidadePassaporte": "2033-01-10",
  "nif": "123456789",
  "telefone": "+244923456789",
  "morada": "Friedrichstraße 123",
  "codigoPostal": "10117",
  "cidade": "Berlin",
  "pais": "DE"
}
```
**Roles:** ADMIN, OFFICER

#### Get Cidadão
```
GET /api/v1/cidadaos/{id}
```
**Roles:** ADMIN, OFFICER, VIEWER

#### Update Cidadão
```
PUT /api/v1/cidadaos/{id}
```
**Roles:** ADMIN, OFFICER

#### Deactivate Cidadão
```
PATCH /api/v1/cidadaos/{id}/desactivar
```
**Roles:** ADMIN

---

### Visto

#### List Vistos
```
GET /api/v1/vistos?page=0&size=20&estado=SUBMETIDO&tipo=TURISMO
```
**Roles:** ADMIN, OFFICER, VIEWER

#### Create Visto
```
POST /api/v1/vistos

{
  "cidadaoId": "uuid",
  "tipo": "TURISMO",
  "motivo": "Férias em família",
  "dataEntrada": "2026-06-01",
  "dataSaida": "2026-06-15",
  "alojamento": "Hotel Berlim",
  "enderecoAlojamento": "Unter den Linden 1, Berlin"
}
```
**Roles:** ADMIN, OFFICER (backend), authenticated citizen (mobile)

Tipos: `TURISMO`, `TRABALHO`, `ESTUDO`, `NEGOCIO`, `TRANSITO`, `RESIDENCIA`, `DIPLOMATICO`

#### Change Visto State
```
PATCH /api/v1/vistos/{id}/estado

{
  "novoEstado": "EM_ANALISE",
  "comentario": "Documentação recebida, em análise"
}
```
**Roles:** ADMIN, OFFICER

Estados: `RASCUNHO` → `SUBMETIDO` → `EM_ANALISE` → `APROVADO` / `REJEITADO` → `EMITIDO` → `ENTREGUE` / `EXPIRADO` / `CANCELADO`

#### Get Visto Timeline
```
GET /api/v1/vistos/{id}/timeline
```
Response:
```json
[
  {
    "id": "uuid",
    "estado": "SUBMETIDO",
    "dataHora": "2026-02-18T10:00:00Z",
    "usuario": "jsilva",
    "comentario": "Pedido submetido via app móvel"
  }
]
```

---

### Agendamento

#### List Agendamentos
```
GET /api/v1/agendamentos?page=0&size=20&data=2026-03-01
```
**Roles:** ADMIN, OFFICER, VIEWER

#### Get Available Slots
```
GET /api/v1/agendamentos/slots?tipo=ENTREGA_PASSAPORTE&data=2026-03-15
```
Response:
```json
[
  { "hora": "09:00", "disponivel": true },
  { "hora": "09:30", "disponivel": false },
  { "hora": "10:00", "disponivel": true }
]
```

#### Create Agendamento
```
POST /api/v1/agendamentos

{
  "cidadaoId": "uuid",
  "tipo": "ENTREGA_PASSAPORTE",
  "dataHora": "2026-03-15T10:00:00",
  "notas": "Passaporte renovado"
}
```
**Roles:** ADMIN, OFFICER, authenticated citizen (mobile)

Tipos: `ENTREGA_PASSAPORTE`, `PEDIDO_VISTO`, `REGISTO_CONSULAR`, `LEGALIZACAO`, `NOTARIADO`, `INFORMACAO`, `OUTRO`

#### Cancel Agendamento
```
PATCH /api/v1/agendamentos/{id}/cancelar

{
  "motivo": "Cidadão solicitou cancelamento"
}
```

---

### Documento

#### Upload Documento
```
POST /api/v1/documentos
Content-Type: multipart/form-data

file: (binary)
processoId: uuid
tipoDocumento: PASSAPORTE_COPIA
```
**Max size:** 10MB
**Allowed types:** PDF, JPG, PNG, JPEG

#### Download Documento
```
GET /api/v1/documentos/{id}/download
```
Returns binary file with appropriate Content-Type header.

---

## SI API (port 8082)

### Public Endpoints (no auth required)

#### List Pages
```
GET /api/v1/public/pages
```

#### Get Page by Slug
```
GET /api/v1/public/pages/{slug}
```

#### List Events
```
GET /api/v1/public/events?upcoming=true
```

#### Get Event
```
GET /api/v1/public/events/{id}
```

### Admin Endpoints (auth required)

#### Create Page
```
POST /api/v1/admin/pages

{
  "titulo": "Serviços Consulares",
  "slug": "servicos-consulares",
  "conteudo": "<h2>Vistos</h2><p>...</p>",
  "status": "DRAFT",
  "idioma": "pt"
}
```

#### Create Event
```
POST /api/v1/admin/events

{
  "titulo": "Dia da Independência",
  "descricao": "Celebração do 11 de Novembro",
  "startDate": "2026-11-11T10:00:00",
  "endDate": "2026-11-11T18:00:00",
  "location": "Embaixada de Angola, Berlin",
  "status": "PUBLISHED"
}
```

---

## WN API (port 8083)

### Public Endpoints

#### List Published Articles
```
GET /api/v1/public/articles?page=0&size=10&category=politica
```

#### Get Article by Slug
```
GET /api/v1/public/articles/{slug}
```

#### List Categories
```
GET /api/v1/public/categories
```

#### Search Articles
```
GET /api/v1/public/search?q=angola+economia&page=0&size=10
```
Full-text search using PostgreSQL tsvector.

### Admin Endpoints

#### Create Article
```
POST /api/v1/admin/articles

{
  "titulo": "Angola assina acordo comercial",
  "slug": "angola-acordo-comercial",
  "resumo": "Novo acordo bilateral...",
  "conteudo": "<p>O governo angolano...</p>",
  "categorias": ["economia", "politica"],
  "tags": ["comercio", "bilateral"],
  "status": "DRAFT"
}
```

#### Publish Article
```
PATCH /api/v1/admin/articles/{id}/publish
```

---

## GPJ API (port 8084)

### Dashboard
```
GET /api/v1/dashboard
```
Response:
```json
{
  "totalSprints": 20,
  "totalTasks": 72,
  "completedTasks": 64,
  "progressPercent": 88.9,
  "hoursPlanned": 858,
  "hoursConsumed": 848,
  "currentSprint": { "id": 19, "titulo": "Go-Live" },
  "systemHealth": {
    "sgc": "UP", "si": "UP", "wn": "UP", "gpj": "UP"
  }
}
```

### Sprints
```
GET /api/v1/sprints
POST /api/v1/sprints
GET /api/v1/sprints/{id}
GET /api/v1/sprints/{id}/tasks
```

### Tasks
```
POST /api/v1/tasks
PATCH /api/v1/tasks/{id}/status  { "status": "CONCLUIDA" }
```

### Time Logs
```
POST /api/v1/timelogs

{
  "taskId": "uuid",
  "horas": 2.5,
  "descricao": "Backend implementation",
  "loggedDate": "2026-02-18"
}
```

---

## Health Check (all systems)

```
GET /api/actuator/health
```

Response:
```json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP" },
    "redis": { "status": "UP" },
    "diskSpace": { "status": "UP" }
  }
}
```

---

## Rate Limiting

All APIs enforce rate limiting:

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Public (SI, WN) | 200 req | 1 min |
| Authenticated | 100 req | 1 min |
| File upload | 10 req | 1 min |
| Login attempts | 5 req | 5 min |

Exceeded: `429 Too Many Requests` with `Retry-After` header.
