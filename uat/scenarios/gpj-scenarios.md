# UAT Scenarios — GPJ (Gestão de Projectos)

## Tester Role: IT Lead, Project Lead
## System: https://staging-gpj.embaixada-angola.de

---

### GPJ-01: Login & Dashboard

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to GPJ URL | Keycloak login page | [ ] |
| 2 | Login with credentials | Dashboard displayed | [ ] |
| 3 | Verify KPI cards | Total sprints, tasks, progress %, hours consumed | [ ] |
| 4 | Verify sprint progress chart | Bar/line chart with sprint progression | [ ] |
| 5 | Verify burn-down chart | Current sprint burn-down displayed | [ ] |
| 6 | Verify recent activity | Latest task updates listed | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-02: Sprint Management

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to sprints list | All sprints with status badges | [ ] |
| 2 | Click on a sprint | Sprint detail: tasks, hours, progress | [ ] |
| 3 | Verify sprint timeline | Start/end dates, Gantt bar | [ ] |
| 4 | Create new sprint | Form: title, dates, planned hours | [ ] |
| 5 | Edit sprint | Changes persisted | [ ] |
| 6 | Close sprint | Sprint marked CONCLUIDA | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-03: Task Management (Kanban Board)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open sprint board | Kanban columns: Pendente, Em Progresso, Concluída | [ ] |
| 2 | Create new task | Form: name, description, sprint, assignee, hours | [ ] |
| 3 | Drag task to Em Progresso | Status updates in real-time | [ ] |
| 4 | Drag task to Concluída | Status updates, progress recalculated | [ ] |
| 5 | Open task detail | Full detail: description, assignee, hours, artefacts | [ ] |
| 6 | Add artefact to task | Artefact linked | [ ] |
| 7 | Edit task | Changes persisted | [ ] |
| 8 | Delete task | Confirmation → task removed | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-04: Time Tracking

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open task detail | Time log section visible | [ ] |
| 2 | Log time: 2h "Implementation" | Time entry created | [ ] |
| 3 | Verify sprint hours update | Consumed hours increase by 2 | [ ] |
| 4 | Log time on different date | Date picker works correctly | [ ] |
| 5 | Edit time entry | Hours/description updated | [ ] |
| 6 | Delete time entry | Entry removed, hours recalculated | [ ] |
| 7 | Verify weekly summary | Correct hours per day/week | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-05: Gantt Chart

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to Gantt view | Timeline chart displayed | [ ] |
| 2 | Verify sprint bars | All sprints shown as horizontal bars | [ ] |
| 3 | Verify dependencies | Dependency arrows between tasks | [ ] |
| 4 | Zoom in/out | Timeline scale adjusts | [ ] |
| 5 | Click on a bar | Opens sprint/task detail | [ ] |
| 6 | Verify critical path | Highlighted or distinguishable | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-06: Reports & Analytics

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to reports | Report options displayed | [ ] |
| 2 | Velocity chart | Sprint velocity over time | [ ] |
| 3 | Hours report | Planned vs consumed per sprint | [ ] |
| 4 | Team workload | Hours per assignee | [ ] |
| 5 | Export report | PDF/CSV download works | [ ] |
| 6 | Filter by date range | Report updates with selected range | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-07: Cross-System Monitoring

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Verify SGC module status | Health check / deployment status shown | [ ] |
| 2 | Verify SI module status | Health check displayed | [ ] |
| 3 | Verify WN module status | Health check displayed | [ ] |
| 4 | Verify mobile module status | Build status / version shown | [ ] |
| 5 | Verify integration status | RabbitMQ/Redis connectivity shown | [ ] |

**Notes:** _______________________________________________________________

---

### GPJ-08: Role-Based Access

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login as ADMIN | Full access: CRUD sprints, tasks, settings | [ ] |
| 2 | Login as MEMBER | Can create/edit tasks, log time; no sprint management | [ ] |
| 3 | Login as VIEWER | Read-only access to dashboard and reports | [ ] |
| 4 | VIEWER attempts task creation | Action denied / button hidden | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| GPJ-01 | [ ] Pass [ ] Fail | | |
| GPJ-02 | [ ] Pass [ ] Fail | | |
| GPJ-03 | [ ] Pass [ ] Fail | | |
| GPJ-04 | [ ] Pass [ ] Fail | | |
| GPJ-05 | [ ] Pass [ ] Fail | | |
| GPJ-06 | [ ] Pass [ ] Fail | | |
| GPJ-07 | [ ] Pass [ ] Fail | | |
| GPJ-08 | [ ] Pass [ ] Fail | | |

**Overall GPJ Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
