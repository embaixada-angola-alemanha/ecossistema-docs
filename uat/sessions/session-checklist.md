# UAT Session Checklist

Use this checklist for each UAT session to ensure nothing is missed.

---

## Pre-Session (T-30 min)

### Environment
- [ ] SGC frontend accessible
- [ ] SI frontend accessible
- [ ] WN frontend accessible
- [ ] GPJ frontend accessible
- [ ] All backend APIs responding (actuator/health)
- [ ] Keycloak accessible and accounts verified
- [ ] Test data seeded (cidadãos, vistos, agendamentos, articles)
- [ ] Mobile app installed on test devices (iOS + Android)

### Materials
- [ ] Printed scenario sheets for today's systems
- [ ] Printed feedback forms (1 per participant)
- [ ] Usability survey forms
- [ ] Pens for marking Pass/Fail
- [ ] Sticky notes for additional comments

### Technology
- [ ] Screen recording software ready
- [ ] Screenshot tool ready
- [ ] Video conferencing link shared (if remote participants)
- [ ] Projector / screen sharing tested
- [ ] Wi-Fi working (test mobile app connectivity)

### People
- [ ] Participants confirmed attendance
- [ ] Participant credentials provided (printed cards with username/password)
- [ ] Note-taker assigned
- [ ] IT support on standby

---

## During Session

### Opening
- [ ] Welcome and introductions
- [ ] Brief overview of today's scope
- [ ] "This tests the system, not you" statement
- [ ] Distribute materials
- [ ] Start screen recording

### Execution
- [ ] Each scenario executed in order
- [ ] Pass/Fail marked for every step
- [ ] Notes taken for hesitations and comments
- [ ] Issues captured immediately with screenshots
- [ ] Time noted for each scenario start/end

### Closing
- [ ] Feedback forms distributed and collected
- [ ] Usability survey completed
- [ ] Open questions asked
- [ ] Follow-up scheduled if needed
- [ ] Stop screen recording
- [ ] Thank participants

---

## Post-Session (Same Day)

### Data Entry
- [ ] All scenario results entered digitally
- [ ] All issues logged in issue-tracker.md
- [ ] Screenshots attached to relevant issues
- [ ] Screen recordings saved and labeled

### Communication
- [ ] Summary email sent to participants
- [ ] Issues shared with development team
- [ ] Next session reminder sent (if applicable)

### Triage (Next Morning)
- [ ] Issues reviewed with dev team
- [ ] Severity confirmed/adjusted
- [ ] Assignees set for each issue
- [ ] Fix timeline estimated
- [ ] Re-test scenarios identified

---

## Session Summary Template

```
SESSION SUMMARY
═══════════════════════════════════════════════

Date:         _______________
Duration:     _______________
System(s):    _______________
Facilitator:  _______________
Participants: _______________

SCENARIOS
  Total:     ___
  Passed:    ___
  Failed:    ___
  Skipped:   ___
  Pass Rate: ____%

ISSUES FOUND
  Critical:  ___
  High:      ___
  Medium:    ___
  Low:       ___
  Total:     ___

TOP ISSUES
  1. _______________________________________________
  2. _______________________________________________
  3. _______________________________________________

POSITIVE FEEDBACK
  1. _______________________________________________
  2. _______________________________________________

CONCERNS
  1. _______________________________________________
  2. _______________________________________________

ACTION ITEMS
  1. _______________________________________________
  2. _______________________________________________
  3. _______________________________________________

Next Session: _______________
═══════════════════════════════════════════════
```
