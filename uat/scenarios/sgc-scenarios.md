# UAT Scenarios — SGC (Gestão Consular)

## Tester Role: Funcionário Consular, Consul
## System: https://staging-sgc.embaixada-angola.site

---

### SGC-01: Login & Dashboard

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to SGC URL | Keycloak login page displayed | [ ] |
| 2 | Enter credentials | Redirected to SGC dashboard | [ ] |
| 3 | Verify dashboard widgets | KPI cards show: cidadãos count, vistos pending, agendamentos today, documents pending | [ ] |
| 4 | Verify quick actions | Buttons: Novo Cidadão, Novo Visto, Novo Agendamento visible | [ ] |
| 5 | Verify user menu | Name, role, logout option displayed | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-02: Cidadão Registration (New Citizen)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Click "Novo Cidadão" | Registration form opens | [ ] |
| 2 | Fill required fields: nome, data_nascimento, nacionalidade, email | Fields accept valid input | [ ] |
| 3 | Fill passport: numero_passaporte, data_emissao, data_validade | Passport section populated | [ ] |
| 4 | Fill address: morada, codigo_postal, cidade, pais | Address section populated | [ ] |
| 5 | Fill NIF (optional) | NIF field accepts value | [ ] |
| 6 | Upload photo | Photo preview shown | [ ] |
| 7 | Click "Guardar" | Success notification, redirected to cidadão detail | [ ] |
| 8 | Verify data persisted | All fields show correct values | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-03: Cidadão Search & Filtering

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to cidadão list | Paginated list with 20 items/page | [ ] |
| 2 | Search by name "Silva" | Filtered results matching "Silva" | [ ] |
| 3 | Search by passport number | Exact match found | [ ] |
| 4 | Search by NIF | Exact match found | [ ] |
| 5 | Use pagination | Next/previous pages load correctly | [ ] |
| 6 | Click on a cidadão row | Detail view opens | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-04: Cidadão Edit & Deactivation

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open cidadão detail | All data displayed | [ ] |
| 2 | Click "Editar" | Form enters edit mode | [ ] |
| 3 | Change email and phone | Fields accept new values | [ ] |
| 4 | Click "Guardar" | Updated successfully | [ ] |
| 5 | Verify audit trail | Updated timestamp and user recorded | [ ] |
| 6 | Click "Desactivar" | Confirmation dialog shown | [ ] |
| 7 | Confirm deactivation | Cidadão marked inactive, greyed in list | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-05: Visto Application (New Visa)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open cidadão detail | Cidadão data shown | [ ] |
| 2 | Click "Novo Visto" | Visa form opens with cidadão pre-filled | [ ] |
| 3 | Select tipo: TURISMO | Type selected | [ ] |
| 4 | Fill motivo, data_entrada, data_saida | Fields populated | [ ] |
| 5 | Fill alojamento details | Accommodation section filled | [ ] |
| 6 | Upload required documents | Files attached | [ ] |
| 7 | Click "Submeter" | Visto created with estado SUBMETIDO | [ ] |
| 8 | Verify in visa list | New visa appears with correct status | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-06: Visto Workflow (State Transitions)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open a SUBMETIDO visa | Detail view shown | [ ] |
| 2 | Click "Em Análise" | Estado changes to EM_ANALISE | [ ] |
| 3 | Add internal note | Note saved with timestamp | [ ] |
| 4 | Click "Aprovado" | Estado changes to APROVADO | [ ] |
| 5 | Verify timeline | All state transitions shown chronologically | [ ] |
| 6 | Test REJEITADO flow | Create new visa → reject with motivo | [ ] |
| 7 | Verify rejection reason | Motivo displayed in timeline | [ ] |
| 8 | Test all 7 visa types | Each type has correct required fields | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-07: Agendamento (Appointment Scheduling)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to agendamentos | Calendar/list view shown | [ ] |
| 2 | Click "Novo Agendamento" | Scheduling form opens | [ ] |
| 3 | Select cidadão | Citizen search + select works | [ ] |
| 4 | Select tipo: ENTREGA_PASSAPORTE | Type selected | [ ] |
| 5 | Select date | Available dates shown | [ ] |
| 6 | Select time slot | Available slots shown (no conflicts) | [ ] |
| 7 | Add notes | Notes field accepts text | [ ] |
| 8 | Click "Confirmar" | Appointment created with estado CONFIRMADO | [ ] |
| 9 | Verify conflict detection | Try same slot → error shown | [ ] |
| 10 | Cancel appointment | Estado changes to CANCELADO with motivo | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-08: Document Management

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open cidadão/processo detail | Documents tab visible | [ ] |
| 2 | Upload PDF document | File uploaded, preview available | [ ] |
| 3 | Upload image document | Image uploaded, thumbnail shown | [ ] |
| 4 | Download document | File downloads correctly | [ ] |
| 5 | Verify file size limit | Large file (>10MB) shows error | [ ] |
| 6 | Delete document | Confirmation → document removed | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-09: Notifications

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Check notification bell | Unread count badge shown | [ ] |
| 2 | Click bell | Notification dropdown opens | [ ] |
| 3 | Click notification | Navigates to related entity | [ ] |
| 4 | Mark as read | Badge count decreases | [ ] |
| 5 | Verify auto-notifications | State changes generate notifications | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-10: Role-Based Access Control

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login as ADMIN | Full menu: cidadãos, vistos, agendamentos, relatórios, configurações | [ ] |
| 2 | Login as OFFICER | Menu: cidadãos, vistos, agendamentos (no configurações) | [ ] |
| 3 | Login as VIEWER | Read-only access, no create/edit/delete buttons | [ ] |
| 4 | VIEWER attempts direct URL to edit | Access denied / redirect | [ ] |
| 5 | Verify API enforcement | VIEWER POST request returns 403 | [ ] |

**Notes:** _______________________________________________________________

---

### SGC-11: Reports & Export

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to reports | Report options shown | [ ] |
| 2 | Generate cidadão report | PDF/CSV generated with correct data | [ ] |
| 3 | Generate visa statistics | Charts + table with period filter | [ ] |
| 4 | Export to CSV | File downloads with correct encoding (UTF-8) | [ ] |
| 5 | Verify Portuguese accents | Names with ã, ç, é render correctly | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| SGC-01 | [ ] Pass [ ] Fail | | |
| SGC-02 | [ ] Pass [ ] Fail | | |
| SGC-03 | [ ] Pass [ ] Fail | | |
| SGC-04 | [ ] Pass [ ] Fail | | |
| SGC-05 | [ ] Pass [ ] Fail | | |
| SGC-06 | [ ] Pass [ ] Fail | | |
| SGC-07 | [ ] Pass [ ] Fail | | |
| SGC-08 | [ ] Pass [ ] Fail | | |
| SGC-09 | [ ] Pass [ ] Fail | | |
| SGC-10 | [ ] Pass [ ] Fail | | |
| SGC-11 | [ ] Pass [ ] Fail | | |

**Overall SGC Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
