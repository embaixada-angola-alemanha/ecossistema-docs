# SGC — Access Matrix (Citizen-Scoped Access)

## Roles

| Role | Description |
|------|-------------|
| **ADMIN** | Full system administrator. All CRUD + delete + system config. |
| **CONSUL** | Consul / senior officer. Full CRUD + state changes + reports. |
| **OFFICER** | Consular officer. CRUD on operational data, no admin access. |
| **CITIZEN** | Registered citizen. Own data only — read, create requests. |
| **EDITOR** | Content editor. Read + update on operational data. |
| **VIEWER** | Read-only observer. View all data, no modifications. |

---

## Module Permissions

### Legend

| Symbol | Meaning |
|--------|---------|
| **C** | Create |
| **R** | Read (list + detail) |
| **U** | Update |
| **D** | Delete |
| **S** | Change state/status |
| **OWN** | Own records only (scoped by cidadaoId) |
| **—** | No access |

---

### 1. Cidadaos (Citizens)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | — | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| View own profile (`/me`) | — | — | — | R | — | — |
| Create | C | C | C | — | — | — |
| Update | U | U | U | U (OWN) | U | — |
| Change state | S | S | — | — | — | — |
| Delete | D | — | — | — | — | — |
| Link Keycloak account | U | U | — | — | — | — |

**Notes:**
- Citizens access their profile via `GET /api/v1/cidadaos/me`
- Citizens can update their own profile only
- Admin can link a Cidadao record to a Keycloak account via `PATCH /api/v1/cidadaos/{id}/link`

---

### 2. Vistos (Visas)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | R (OWN) | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| View history | R | R | R | R (OWN) | R | R |
| Create | C | C | C | C (OWN) | — | — |
| Update | U | U | U | — | U | — |
| Change state | S | S | — | — | — | — |
| Delete | D | — | — | — | — | — |
| View fees | R | R | R | R | R | R |
| View checklist | R | R | R | R | R | R |

**Notes:**
- Citizens can submit new visa applications (cidadaoId auto-set to own)
- Citizens see only their own visas in the list
- Staff sees all visas with no filtering

---

### 3. Agendamentos (Appointments)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | R (OWN) | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| View history | R | R | R | R (OWN) | R | R |
| Create | C | C | C | C (OWN) | — | — |
| Reschedule | U | U | U | — | — | — |
| Change state | S | S | S | — | — | — |
| Delete | D | — | — | — | — | — |
| View available slots | R | R | R | R | R | R |

**Notes:**
- Citizens can book appointments (cidadaoId auto-set to own)
- Citizens see only their own appointments

---

### 4. Registos Civis (Civil Registry)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | R (OWN) | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| View history | R | R | R | R (OWN) | R | R |
| Create (request) | C | C | C | C (OWN) | — | — |
| Update | U | U | U | — | U | — |
| Change state | S | S | — | — | — | — |
| Delete | D | — | — | — | — | — |
| Download certificate | R | R | R | R (OWN) | R | R |

**Notes:**
- Citizens can request civil registry records (birth, marriage, etc.)
- cidadaoId auto-set to own record

---

### 5. Servicos Notariais (Notarial Services)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | R (OWN) | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| View history | R | R | R | R (OWN) | R | R |
| Create (request) | C | C | C | C (OWN) | — | — |
| Update | U | U | U | — | U | — |
| Change state | S | S | — | — | — | — |
| Delete | D | — | — | — | — | — |
| View fees | R | R | R | R | R | R |
| Download certificate | R | R | R | R (OWN) | R | R |

**Notes:**
- Citizens can request notarial services (powers of attorney, declarations, etc.)
- cidadaoId auto-set to own record

---

### 6. Documentos (Documents)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | R (OWN) | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| Upload | C | C | C | C (OWN) | C | — |
| Download file | R | R | R | R (OWN) | R | R |
| View versions | R | R | R | R (OWN) | R | R |
| Change state | S | S | — | — | — | — |
| Delete | D | D | — | — | — | — |

**Notes:**
- Citizens upload documents for their own profile only
- The ciudadao picker is hidden for citizens; their cidadaoId is auto-set

---

### 7. Processos (Cases/Processes)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| List all | R | R | R | R (OWN) | R | R |
| View detail | R | R | R | R (OWN) | R | R |
| View history | R | R | R | R (OWN) | R | R |
| Create | C | C | C | — | — | — |
| Update | U | U | U | — | U | — |
| Change state | S | S | — | — | — | — |
| Delete | D | — | — | — | — | — |

**Notes:**
- Processes are created by staff only
- Citizens can view processes linked to their cidadaoId

---

### 8. Dashboard

| Feature | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|---------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| Global KPIs | Yes | Yes | Yes | — | Yes | Yes |
| Personal KPIs | — | — | — | Yes | — | — |
| Recent visas (global) | Yes | Yes | Yes | — | Yes | Yes |
| My recent visas | — | — | — | Yes | — | — |
| Upcoming appointments (global) | Yes | Yes | Yes | — | Yes | Yes |
| My upcoming appointments | — | — | — | Yes | — | — |
| Quick action: New Citizen | Yes | Yes | Yes | — | — | — |
| Quick action: New Visa | Yes | Yes | Yes | Yes | — | — |
| Quick action: New Appointment | Yes | Yes | Yes | Yes | — | — |

---

### 9. Relatorios (Reports)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| View reports | Yes | Yes | — | — | — | — |
| Export reports | Yes | Yes | — | — | — | — |
| Audit log | Yes | Yes | — | — | — | — |

---

### 10. User Admin

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| Manage users | Yes | Yes | — | — | — | — |

---

### 11. Workflow Admin

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| Configure workflows | Yes | Yes | — | — | — | — |

---

### 12. Notificacoes (Notifications)

| Action | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|--------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| View all | Yes | Yes | — | — | — | — |
| Read own | — | — | Yes | — | — | — |

---

## Navigation Visibility

Which sidebar items each role sees:

| Nav Item | ADMIN | CONSUL | OFFICER | CITIZEN | EDITOR | VIEWER |
|----------|:-----:|:------:|:-------:|:-------:|:------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes | Yes | Yes |
| Meu Perfil | — | — | — | Yes | — | — |
| Cidadaos | Yes | Yes | Yes | — | Yes | Yes |
| Vistos | Yes | Yes | Yes | Yes | Yes | Yes |
| Agendamentos | Yes | Yes | Yes | Yes | Yes | Yes |
| Registos Civis | Yes | Yes | Yes | Yes | Yes | Yes |
| Servicos Notariais | Yes | Yes | Yes | Yes | Yes | Yes |
| Documentos | Yes | Yes | Yes | Yes | Yes | Yes |
| Workflow Admin | Yes | Yes | — | — | — | — |
| User Admin | Yes | Yes | — | — | — | — |
| Relatorios | Yes | Yes | — | — | — | — |
| Notificacoes | Yes | Yes | Yes | — | — | — |

---

## Implementation Details

### Citizen Data Scoping (Backend)

All backend controllers use `CitizenContextService` to:
1. Check `isCitizenOnly()` — true if user has CITIZEN role but none of ADMIN, CONSUL, OFFICER, EDITOR, VIEWER
2. Resolve cidadaoId via `SecurityUtils.getCurrentUserSubject()` → `CidadaoRepository.findByKeycloakId()`
3. Force `cidadaoId` filter on list queries for citizen users
4. Verify ownership on detail/update operations via `canAccessCidadaoData()`
5. Force own cidadaoId on POST (create) requests — citizens cannot create records for others

### Citizen Data Scoping (Frontend)

All list components inject `CitizenContextService` and:
1. Pass `citizenContext.cidadaoId()` to service `getAll()` calls
2. The backend enforces scoping regardless, but passing cidadaoId avoids 403 errors
3. `canCreate` signals include CITIZEN for modules where citizens can create (visas, appointments, registos, servicos, documentos)
4. The documento list auto-sets cidadaoId for citizens, hiding the cidadao picker

### Keycloak Linking

- `Cidadao.keycloakId` column links a citizen record to a Keycloak account
- `GET /api/v1/cidadaos/me` resolves the current citizen using the JWT `sub` claim
- `PATCH /api/v1/cidadaos/{id}/link` (admin only) associates a Keycloak user with a citizen record
