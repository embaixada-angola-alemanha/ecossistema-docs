# UAT — User Acceptance Testing

## Ecossistema Digital — Embaixada de Angola na Alemanha

### Overview

This directory contains all artifacts for User Acceptance Testing with embassy staff.
UAT validates that every system meets real-world operational requirements before go-live.

### Structure

```
uat/
├── README.md                  ← this file
├── uat-plan.md                ← master UAT plan & schedule
├── scenarios/
│   ├── sgc-scenarios.md       ← SGC consular management scenarios
│   ├── si-scenarios.md        ← SI institutional website scenarios
│   ├── wn-scenarios.md        ← WN news portal scenarios
│   ├── gpj-scenarios.md       ← GPJ project management scenarios
│   ├── mobile-scenarios.md    ← mobile app scenarios
│   └── cross-system.md        ← cross-system integration scenarios
├── sessions/
│   ├── session-guide.md       ← facilitator guide for UAT sessions
│   └── session-checklist.md   ← per-session checklist
├── feedback/
│   ├── feedback-form.md       ← template for participant feedback
│   └── usability-survey.md    ← SUS (System Usability Scale) survey
├── issues/
│   ├── issue-tracker.md       ← UAT issue log & triage
│   └── severity-matrix.md     ← severity/priority classification
└── training-needs.md          ← training needs assessment
```

### UAT Participants

| Role | System Access | Sessions |
|------|--------------|----------|
| Embaixador / Director | GPJ (read-only), SI (review) | 1 demo |
| Consul / Chefe Secção Consular | SGC (full), GPJ (viewer) | 3 sessions |
| Funcionário Consular | SGC (operator), Mobile | 3 sessions |
| Assessor de Comunicação | WN (editor), SI (editor) | 2 sessions |
| Assistente Administrativo | SGC (viewer), GPJ (viewer) | 2 sessions |
| IT / Infra | All systems (admin) | 1 session |

### Timeline

| Day | Activity |
|-----|----------|
| Day 1 | Kick-off, demo, environment setup |
| Day 2-3 | SGC scenarios (consular workflows) |
| Day 4 | SI + WN scenarios (content management) |
| Day 5 | GPJ + mobile + cross-system scenarios |
| Day 6 | Issue triage, feedback consolidation |
| Day 7 | Training needs report, sign-off |
