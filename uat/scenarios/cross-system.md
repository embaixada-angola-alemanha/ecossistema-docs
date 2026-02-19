# UAT Scenarios — Cross-System Integration

## Tester Role: IT Lead, Consul
## Systems: All

---

### CROSS-01: Citizen Journey — Visa Application (SGC → Mobile → SI)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Citizen opens mobile app | Login screen displayed | [ ] |
| 2 | Citizen registers/logs in | Home screen with profile | [ ] |
| 3 | Citizen applies for visa (mobile) | Visa created in SGC backend | [ ] |
| 4 | Officer opens SGC admin | New visa visible in SUBMETIDO list | [ ] |
| 5 | Officer changes to EM_ANALISE | Status updates | [ ] |
| 6 | Citizen receives push notification | "Visto em análise" notification | [ ] |
| 7 | Citizen opens visa tracking | Timeline shows EM_ANALISE | [ ] |
| 8 | Officer approves visa | Status = APROVADO | [ ] |
| 9 | Citizen receives push notification | "Visto aprovado" notification | [ ] |
| 10 | Citizen checks tracking | Timeline shows full journey | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-02: Appointment Flow (Mobile → SGC → QR Check-in)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Citizen books appointment (mobile) | Appointment created in SGC | [ ] |
| 2 | Officer sees appointment in SGC | Listed in agenda view | [ ] |
| 3 | Citizen receives confirmation | Push notification + in-app | [ ] |
| 4 | Citizen opens QR code on appointment day | QR code displayed | [ ] |
| 5 | Officer scans/verifies QR | Appointment details shown | [ ] |
| 6 | Officer marks ATENDIDO | Status updated | [ ] |
| 7 | Citizen sees completed status | ATENDIDO in history | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-03: News Publication (WN Admin → WN Public → Mobile)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Editor creates article in WN admin | Article saved as DRAFT | [ ] |
| 2 | Editor publishes article | Article live on WN public site | [ ] |
| 3 | Verify on WN homepage | Article appears in latest news | [ ] |
| 4 | Open mobile app, go to Notícias | New article visible in feed | [ ] |
| 5 | Citizen taps article | Full article displayed in mobile | [ ] |
| 6 | Editor updates article in WN admin | Changes reflected on public + mobile | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-04: Event Flow (SI Admin → SI Public → Mobile)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Admin creates event in SI | Event saved | [ ] |
| 2 | Admin publishes event | Event on SI public events page | [ ] |
| 3 | Verify on SI public site | Event with date, location, description | [ ] |
| 4 | Verify multilingual | Event displayed in PT/EN/DE | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-05: GPJ Project Monitoring

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open GPJ dashboard | Overall project status visible | [ ] |
| 2 | Verify all modules health | SGC, SI, WN, Mobile shown as healthy | [ ] |
| 3 | Verify sprint progress | Current sprint tasks and completion % | [ ] |
| 4 | View Gantt chart | All sprints with correct timeline | [ ] |
| 5 | Check hours report | Planned vs consumed accurate | [ ] |
| 6 | Generate progress report | PDF with project overview | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-06: SSO (Single Sign-On) Across Systems

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login to SGC | Keycloak SSO, SGC accessible | [ ] |
| 2 | Navigate to GPJ URL | Already authenticated (SSO session) | [ ] |
| 3 | Navigate to SI admin | Already authenticated | [ ] |
| 4 | Navigate to WN admin | Already authenticated | [ ] |
| 5 | Logout from one system | All systems logged out (SLO) | [ ] |
| 6 | Verify token expiry | After token expires, redirect to login | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-07: Data Consistency

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Create cidadão in SGC | Cidadão persisted | [ ] |
| 2 | Apply for visa via mobile for same cidadão | Visa linked to correct cidadão | [ ] |
| 3 | Verify cidadão data matches | Name, passport, dates consistent | [ ] |
| 4 | Update cidadão in SGC | Mobile shows updated info | [ ] |
| 5 | Check audit trail | All changes tracked with user + timestamp | [ ] |

**Notes:** _______________________________________________________________

---

### CROSS-08: Error Recovery & Resilience

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Submit form with network error | Graceful error message, retry option | [ ] |
| 2 | Refresh expired session | Redirect to login, no data loss | [ ] |
| 3 | Handle 404 (deleted resource) | Friendly "not found" page | [ ] |
| 4 | Handle 500 (server error) | Generic error message, no stack trace | [ ] |
| 5 | Check browser back/forward | Navigation state preserved | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| CROSS-01 | [ ] Pass [ ] Fail | | |
| CROSS-02 | [ ] Pass [ ] Fail | | |
| CROSS-03 | [ ] Pass [ ] Fail | | |
| CROSS-04 | [ ] Pass [ ] Fail | | |
| CROSS-05 | [ ] Pass [ ] Fail | | |
| CROSS-06 | [ ] Pass [ ] Fail | | |
| CROSS-07 | [ ] Pass [ ] Fail | | |
| CROSS-08 | [ ] Pass [ ] Fail | | |

**Overall Integration Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
