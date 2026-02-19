# UAT Master Plan

## Ecossistema Digital — Embaixada de Angola na Alemanha

---

## 1. Objectives

1. Validate that all systems meet embassy operational requirements
2. Identify usability issues before go-live
3. Confirm role-based access control works correctly per embassy hierarchy
4. Assess training needs for each user role
5. Obtain formal sign-off from embassy leadership

## 2. Scope

### In Scope
- SGC — Gestão Consular (citizen management, visas, appointments, documents)
- SI — Site Institucional (public website, events, pages, multilingual)
- WN — Web Notícias (news portal, articles, categories, media)
- GPJ — Gestão de Projectos (sprints, tasks, time tracking, dashboards)
- Mobile App — citizen-facing (profile, visas, appointments, news)
- Cross-system integration (data flow SGC↔SI, SGC↔WN, GPJ monitoring)

### Out of Scope
- Infrastructure/DevOps testing (covered in Sprint 17)
- Load/performance testing (covered in T17.3)
- Penetration testing (covered in T17.2)

## 3. Entry Criteria

- [ ] All Sprint 0-17 tasks CONCLUIDA
- [ ] Staging environment deployed with production-like data
- [ ] All user accounts created in Keycloak with correct roles
- [ ] Test data seeded (50+ cidadãos, 20+ vistos, 30+ agendamentos, 10+ articles)
- [ ] VPN/access configured for remote participants (if applicable)

## 4. Exit Criteria

- [ ] All CRITICAL and HIGH severity issues resolved
- [ ] 100% of mandatory scenarios executed (pass rate ≥ 90%)
- [ ] All participant feedback collected and documented
- [ ] Training needs assessment completed
- [ ] Sign-off obtained from Consul and IT lead

## 5. Test Environment

| Component | URL | Notes |
|-----------|-----|-------|
| SGC Frontend | https://staging-sgc.embaixada-angola.site | Admin portal |
| SI Frontend | https://staging-si.embaixada-angola.site | Public website |
| WN Frontend | https://staging-wn.embaixada-angola.site | News portal |
| GPJ Frontend | https://staging-gpj.embaixada-angola.site | Project mgmt |
| Mobile App | TestFlight / Firebase App Distribution | iOS + Android |
| Keycloak | https://staging-auth.embaixada-angola.site | SSO |

## 6. Roles & Responsibilities

| Person | Role | Responsibility |
|--------|------|---------------|
| Project Lead | UAT Coordinator | Plan, schedule, facilitate sessions |
| Consul | Business Owner | Validate consular workflows, final sign-off |
| Funcionário Consular | Primary Tester | Execute SGC + mobile scenarios |
| Assessor Comunicação | Content Tester | Execute SI + WN scenarios |
| IT Lead | Technical Support | Environment, accounts, troubleshooting |

## 7. Schedule

### Week 1: Preparation
- Finalize UAT scenarios
- Seed test data
- Create user accounts
- Distribute session guides

### Week 2: Execution
| Day | Morning (10:00-12:00) | Afternoon (14:00-16:00) |
|-----|----------------------|------------------------|
| Mon | Kick-off + Demo | SGC: Cidadão CRUD |
| Tue | SGC: Vistos + Agendamentos | SGC: Documentos + RBAC |
| Wed | SI: Pages + Events | WN: Articles + Search |
| Thu | GPJ: Dashboard + Sprints | Mobile: Full flow |
| Fri | Cross-system integration | Issue triage + Feedback |

### Week 3: Resolution
- Bug fixing (T18.2)
- Re-test failed scenarios
- Training needs consolidation
- Final sign-off meeting

## 8. Defect Management

### Severity Levels
| Level | Description | SLA |
|-------|-------------|-----|
| CRITICAL | System unusable, data loss | Fix before next session |
| HIGH | Major feature broken, no workaround | Fix within 2 days |
| MEDIUM | Feature works with workaround | Fix before go-live |
| LOW | Cosmetic, minor UX issue | Fix if time allows |

### Workflow
1. Tester identifies issue → logs in issue-tracker.md
2. UAT Coordinator triages → assigns severity
3. Developer fixes → marks RESOLVED
4. Tester re-tests → marks VERIFIED or REOPENED
5. UAT Coordinator confirms → marks CLOSED

## 9. Communication

- Daily stand-up at 09:30 during UAT week
- Issue tracker reviewed at end of each session
- Slack channel: #uat-ecossistema
- Escalation path: Tester → UAT Coordinator → Consul

## 10. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Staff unavailable | HIGH | Schedule alternatives, record sessions |
| Staging environment down | HIGH | Backup environment, offline screenshots |
| Data sensitivity | MEDIUM | Use anonymized test data only |
| Language barriers | LOW | Scenarios in Portuguese + German |
| Slow internet at embassy | MEDIUM | Pre-cache assets, offline mode testing |

## 11. Sign-Off

```
UAT Sign-Off — Ecossistema Digital

I confirm that the system has been tested and meets the acceptance criteria
for the stated scenarios. All CRITICAL and HIGH issues have been addressed.

System: ________________________________
Tester: ________________________________
Date:   ________________________________
Status: [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] REJECTED

Conditions (if applicable):
_______________________________________________________________
_______________________________________________________________

Signature: ________________________________
```
