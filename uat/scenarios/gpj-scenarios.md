# UAT Scenarios — GOP (Gestao de Operacoes)

## Tester Role: IT Lead, DevOps Engineer
## System: https://staging-gop.embaixada-angola.site

---

### GOP-01: Login & Role-Based Access

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to GOP URL | Keycloak login page displayed | [ ] |
| 2 | Login as GOP-ADMIN | Full access: dashboard, services CRUD, incidents, deployments, maintenance, events, metrics, settings | [ ] |
| 3 | Verify user menu | Name, role (GOP-ADMIN), logout option displayed | [ ] |
| 4 | Logout and login as GOP-OPERATOR | Can manage incidents, deployments, maintenance; cannot create/edit/delete services | [ ] |
| 5 | GOP-OPERATOR attempts to create a service | Action denied / button hidden | [ ] |
| 6 | GOP-OPERATOR attempts DELETE /api/services/{id} | Returns 403 Forbidden | [ ] |
| 7 | Logout and login as GOP-VIEWER | Read-only access to all modules; no create/edit/delete buttons visible | [ ] |
| 8 | GOP-VIEWER attempts to create an incident | Action denied / button hidden | [ ] |
| 9 | GOP-VIEWER attempts POST /api/incidents | Returns 403 Forbidden | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-02: Dashboard Overview

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login and view dashboard | Dashboard loads within 3 seconds | [ ] |
| 2 | Verify service health grid | Cards showing services UP, DOWN, and DEGRADED counts | [ ] |
| 3 | Verify active incidents count | Number of active incidents displayed, P1 count highlighted | [ ] |
| 4 | Verify recent deployments | List of latest deployments with service name, version, environment | [ ] |
| 5 | Verify upcoming maintenance | List of scheduled maintenance windows with dates | [ ] |
| 6 | Verify events today count | Total cross-system events received today | [ ] |
| 7 | Verify uptime bars | Uptime percentages per service (24h/7d/30d) | [ ] |
| 8 | Click on a service card | Navigates to service detail | [ ] |
| 9 | Click on an incident count | Navigates to incidents list | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-03: Monitored Services — List & Detail

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to services list | All monitored services displayed (SGC, SI, WN, GOP backends + infra) | [ ] |
| 2 | Verify status badges | Each service shows current status: UP (green), DOWN (red), DEGRADED (yellow), UNKNOWN (grey) | [ ] |
| 3 | Verify service type labels | Services tagged as BACKEND, FRONTEND, or INFRA | [ ] |
| 4 | Verify auto-polling | Service statuses refresh automatically every 30 seconds | [ ] |
| 5 | Click on a service | Service detail page: name, displayName, type, healthUrl, current status | [ ] |
| 6 | Verify health history | Paginated list of health check logs with timestamps and status | [ ] |
| 7 | Verify uptime calculation | Uptime percentages shown for 24h, 7d, and 30d periods | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-04: Monitored Services — CRUD (Admin Only)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login as GOP-ADMIN | Service management buttons visible | [ ] |
| 2 | Click "Add Service" | Form: name, displayName, type (BACKEND/FRONTEND/INFRA), healthUrl, metadata | [ ] |
| 3 | Fill form with valid data and submit | Service created, success notification, appears in list | [ ] |
| 4 | Submit with missing required field (name blank) | Validation error displayed | [ ] |
| 5 | Open newly created service | Detail page shows correct data | [ ] |
| 6 | Click "Edit Service" | Form pre-filled with current values | [ ] |
| 7 | Change displayName and healthUrl, save | Changes persisted, success notification | [ ] |
| 8 | Click "Delete Service" | Confirmation dialog shown | [ ] |
| 9 | Confirm deletion | Service removed from list, success notification | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-05: Incident Management — Full Lifecycle

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to incidents list | Paginated list of incidents with status and severity | [ ] |
| 2 | Filter by status (e.g., OPEN) | Only OPEN incidents shown | [ ] |
| 3 | Filter by severity (e.g., P1) | Only P1 incidents shown | [ ] |
| 4 | Click "Create Incident" | Form: title, description, severity (P1-P4), affected services, assignedTo | [ ] |
| 5 | Fill form: title="SGC Login Failure", severity=P2, select SGC service | Fields accept valid input | [ ] |
| 6 | Submit | Incident created with status OPEN, reportedBy set to logged-in user | [ ] |
| 7 | Open incident detail | Full detail: title, description, severity, status, affected services, timeline | [ ] |
| 8 | Change status to INVESTIGATING | Status updates, timestamp recorded in timeline | [ ] |
| 9 | Add timeline update: "Root cause identified: database connection pool exhausted" | Update appears in incident timeline with author and timestamp | [ ] |
| 10 | Change status to IDENTIFIED | Status updates in timeline | [ ] |
| 11 | Change status to MONITORING | Status updates in timeline | [ ] |
| 12 | Click "Resolve": rootCause="DB pool leak", resolution="Increased pool size and fixed leak" | Incident status changes to RESOLVED, resolution details saved | [ ] |
| 13 | Click "Close" | Incident status changes to CLOSED | [ ] |
| 14 | Verify full timeline | All transitions shown chronologically: OPEN > INVESTIGATING > IDENTIFIED > MONITORING > RESOLVED > CLOSED | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-06: Auto-Incident on Service Failure

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Identify a monitored service with a valid healthUrl | Service currently showing UP | [ ] |
| 2 | Simulate service failure (stop the service or block healthUrl) | Health check detects failure, service status changes to DOWN | [ ] |
| 3 | Wait for auto-incident creation | Incident automatically created with affected service linked | [ ] |
| 4 | Verify auto-incident details | Title indicates service down, severity appropriate, status OPEN | [ ] |
| 5 | Verify dashboard updates | Active incidents count increases, service health grid shows DOWN | [ ] |
| 6 | Restore the service | Health check detects recovery, service status changes to UP | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-07: Deployment Logging

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to deployments list | Paginated list with service, version, environment, deployer, timestamp | [ ] |
| 2 | Filter by service | Only deployments for selected service shown | [ ] |
| 3 | Filter by environment (STAGING / PRODUCTION) | Filtered results match selected environment | [ ] |
| 4 | Click "Log Deployment" | Form: service (dropdown), versionTag, commitHash, environment (STAGING/PRODUCTION), notes | [ ] |
| 5 | Fill form: service=SGC-Backend, version="v2.3.1", commitHash="abc123f", environment=STAGING | Fields accept valid input | [ ] |
| 6 | Submit | Deployment logged, deployedBy set to logged-in user, success notification | [ ] |
| 7 | Open deployment detail | All fields displayed correctly: service, version, commit, environment, deployer, timestamp, notes | [ ] |
| 8 | Verify deployment appears on dashboard | Recent deployments section on dashboard shows new entry | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-08: Maintenance Windows — Full Lifecycle

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to maintenance list | Paginated list with title, status, scheduled times | [ ] |
| 2 | Filter by status (SCHEDULED) | Only SCHEDULED maintenance windows shown | [ ] |
| 3 | Click "Schedule Maintenance" | Form: title, description, scheduledStart, scheduledEnd, affected services | [ ] |
| 4 | Fill form: title="Database Migration", start=tomorrow 02:00, end=tomorrow 04:00, select SGC+SI | Fields accept valid input | [ ] |
| 5 | Submit | Maintenance window created with status SCHEDULED, success notification | [ ] |
| 6 | Open maintenance detail | All fields displayed: title, description, times, affected services, status, createdBy | [ ] |
| 7 | Edit title and description | Changes persisted, success notification | [ ] |
| 8 | Click "Start Maintenance" | Status changes to IN_PROGRESS | [ ] |
| 9 | Click "Complete Maintenance" | Status changes to COMPLETED | [ ] |
| 10 | Create another maintenance window | New window created with status SCHEDULED | [ ] |
| 11 | Click "Cancel Maintenance" | Status changes to CANCELLED | [ ] |
| 12 | Verify on dashboard | Upcoming maintenance section shows only SCHEDULED items | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-09: System Events Feed

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to system events | Paginated list of cross-system events sorted by timestamp (newest first) | [ ] |
| 2 | Verify event data | Each event shows: source, eventType, timestamp, summary | [ ] |
| 3 | Filter by source "SGC" | Only events from SGC system displayed | [ ] |
| 4 | Filter by source "SI" | Only events from SI system displayed | [ ] |
| 5 | Filter by source "WN" | Only events from WN system displayed | [ ] |
| 6 | Filter by eventType | Only events of selected type displayed | [ ] |
| 7 | Click on an event | Event detail with full JSON payload viewer | [ ] |
| 8 | Verify auto-refresh | New events appear automatically (10-second refresh interval) | [ ] |
| 9 | Verify stats by source | Event count breakdown by source for last 24 hours | [ ] |
| 10 | Verify count today | Today's event count matches displayed feed | [ ] |

**Notes:** _______________________________________________________________

---

### GOP-10: Metrics & Charts

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to metrics page | Metrics dashboard loads | [ ] |
| 2 | Verify request rate chart | Chart.js line chart showing HTTP request rate over time | [ ] |
| 3 | Verify error rate chart | Chart showing error rate (4xx/5xx) over time | [ ] |
| 4 | Verify response time chart | Chart showing average response time over time | [ ] |
| 5 | Verify JVM memory chart | Chart showing JVM heap usage over time | [ ] |
| 6 | Change time range (e.g., 1h, 6h, 24h) | Charts update with data for selected period | [ ] |
| 7 | Enter custom PromQL query | Query executes and results displayed | [ ] |
| 8 | Verify range query | Range query with start/end/step returns time-series data | [ ] |
| 9 | Simulate Prometheus unavailable | "Prometheus unavailable" or error message displayed gracefully (no crash) | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| GOP-01 | [ ] Pass [ ] Fail | | |
| GOP-02 | [ ] Pass [ ] Fail | | |
| GOP-03 | [ ] Pass [ ] Fail | | |
| GOP-04 | [ ] Pass [ ] Fail | | |
| GOP-05 | [ ] Pass [ ] Fail | | |
| GOP-06 | [ ] Pass [ ] Fail | | |
| GOP-07 | [ ] Pass [ ] Fail | | |
| GOP-08 | [ ] Pass [ ] Fail | | |
| GOP-09 | [ ] Pass [ ] Fail | | |
| GOP-10 | [ ] Pass [ ] Fail | | |

**Overall GOP Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
