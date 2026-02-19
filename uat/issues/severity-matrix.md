# Issue Severity & Priority Matrix

## Severity Definitions

### CRITICAL
- System crash, data loss, or security vulnerability
- Core workflow completely blocked with no workaround
- Examples: login broken, data not saving, 500 errors on main pages
- **SLA:** Fix within same day, re-test immediately

### HIGH
- Major feature broken or unusable
- Workaround exists but significantly impacts productivity
- Examples: search not working, form validation missing, wrong data displayed
- **SLA:** Fix within 2 working days

### MEDIUM
- Feature works but with minor issues
- Cosmetic issues that affect professionalism
- Examples: alignment issues, truncated text, slow loading (3-5s)
- **SLA:** Fix before go-live

### LOW
- Minor cosmetic or enhancement
- Does not affect functionality
- Examples: typo, icon inconsistency, tooltip missing
- **SLA:** Fix if time allows, otherwise backlog

---

## Priority Matrix

Priority combines severity with business impact:

|  | High Business Impact | Medium Business Impact | Low Business Impact |
|--|---------------------|----------------------|-------------------|
| **CRITICAL** | P1 — Fix NOW | P1 — Fix NOW | P2 — Fix today |
| **HIGH** | P2 — Fix today | P2 — Fix this sprint | P3 — Fix before go-live |
| **MEDIUM** | P3 — Fix before go-live | P3 — Fix if time | P4 — Backlog |
| **LOW** | P3 — Fix if time | P4 — Backlog | P4 — Backlog |

### Business Impact Guide

**High Impact:**
- Used multiple times daily by consular staff
- Public-facing (SI, WN homepage)
- Security or compliance related
- Blocks other features

**Medium Impact:**
- Used weekly by specific roles
- Admin/editor features
- Reporting and analytics

**Low Impact:**
- Rarely used features
- Internal-only tools
- Nice-to-have improvements

---

## Status Workflow

```
OPEN → IN PROGRESS → RESOLVED → VERIFIED → CLOSED
  │                      │           │
  └──→ WONT_FIX          └──→ REOPENED (back to OPEN)
```

| Status | Description | Owner |
|--------|-------------|-------|
| OPEN | Issue reported, awaiting triage | UAT Coordinator |
| IN PROGRESS | Developer working on fix | Developer |
| RESOLVED | Fix implemented, awaiting re-test | Developer |
| VERIFIED | Tester confirmed fix works | Tester |
| CLOSED | Issue resolved and accepted | UAT Coordinator |
| REOPENED | Fix did not resolve the issue | Tester |
| WONT_FIX | Decided not to fix (with justification) | UAT Coordinator |

---

## Exit Criteria

UAT can proceed to sign-off when:
- [ ] Zero CRITICAL issues open
- [ ] Zero HIGH issues open (or approved deferral)
- [ ] All P1/P2 issues VERIFIED or CLOSED
- [ ] Overall scenario pass rate ≥ 90%
- [ ] All participants have submitted feedback
