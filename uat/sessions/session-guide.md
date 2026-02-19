# UAT Session Facilitator Guide

## Before the Session

### Preparation (30 min before)
- [ ] Verify staging environment is up (check all 4 frontend URLs + APIs)
- [ ] Verify Keycloak has participant accounts with correct roles
- [ ] Verify test data is seeded and consistent
- [ ] Prepare printed copies of scenarios for the session
- [ ] Set up screen recording (OBS Studio or equivalent)
- [ ] Prepare feedback forms (one per participant)
- [ ] Test projector / screen sharing if remote

### Environment Check Script
```bash
# Quick health check for all systems
for URL in \
  "https://staging-sgc.embaixada-angola.site" \
  "https://staging-si.embaixada-angola.site" \
  "https://staging-wn.embaixada-angola.site" \
  "https://staging-gpj.embaixada-angola.site" \
  "https://staging-sgc.embaixada-angola.site/api/actuator/health" \
  "https://staging-si.embaixada-angola.site/api/actuator/health" \
  "https://staging-wn.embaixada-angola.site/api/actuator/health" \
  "https://staging-gpj.embaixada-angola.site/api/actuator/health"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  echo "$URL → HTTP $STATUS"
done
```

## During the Session

### Opening (10 min)
1. Welcome participants and introduce the UAT process
2. Explain: "This is testing the system, not testing you"
3. Emphasize: every issue found now saves problems after go-live
4. Distribute scenario sheets and feedback forms
5. Show how to mark Pass/Fail and write notes

### Execution (90 min)
1. Walk through scenarios sequentially
2. Let the participant drive — do NOT touch their keyboard/mouse
3. Observe and take notes on:
   - Where they hesitate or look confused
   - Unexpected clicks or navigation paths
   - Comments and reactions (verbal and non-verbal)
   - Time taken per scenario
4. If participant gets stuck:
   - Wait 30 seconds before offering guidance
   - Note the confusion as a usability issue
   - Guide them past the block without fixing it for them
5. After each scenario:
   - Ask: "Was that what you expected?"
   - Ask: "Anything confusing or missing?"
   - Record Pass/Fail and any notes

### Issue Logging
When an issue is found:
1. Record it immediately in the issue tracker
2. Capture a screenshot (Ctrl+Shift+S or phone screenshot)
3. Note the exact steps to reproduce
4. Assign initial severity (refine later in triage)
5. Do NOT try to fix it during the session

### Closing (20 min)
1. Collect all scenario sheets (even incomplete ones)
2. Distribute feedback forms / usability survey
3. Allow 10 min for participants to complete surveys
4. Ask open-ended questions:
   - "What was the most useful feature?"
   - "What was the most confusing part?"
   - "What's missing that you need for daily work?"
   - "Would you feel comfortable using this system?"
5. Thank participants for their time
6. Schedule follow-up if needed

## After the Session

### Same Day
- [ ] Transfer all scenario results to digital format
- [ ] Log all issues in issue-tracker.md
- [ ] Review screen recordings for missed observations
- [ ] Send thank-you email with session summary

### Next Day
- [ ] Triage issues with development team
- [ ] Prioritize by severity and impact
- [ ] Update issue tracker with assignments
- [ ] Plan re-test schedule for fixed issues

## Tips for Facilitators

### DO
- Use neutral language ("What happened?" not "You did it wrong")
- Encourage think-aloud: "Tell me what you're thinking"
- Note the time when issues occur
- Record both positive and negative feedback
- Let participants explore naturally

### DON'T
- Guide the participant to the "right" answer
- Express frustration when things break
- Promise specific fix dates
- Skip scenarios because "they probably work"
- Argue about whether something is a bug or a feature

## Session Logistics Template

```
Session: _____________
Date: _______________
Time: _______________
Location: _______________
Facilitator: _______________
Note-taker: _______________

Participants:
  Name: _______________ Role: _______________ Email: _______________
  Name: _______________ Role: _______________ Email: _______________
  Name: _______________ Role: _______________ Email: _______________

Systems Tested: [ ] SGC  [ ] SI  [ ] WN  [ ] GPJ  [ ] Mobile  [ ] Cross-system
Scenarios Completed: ___/___
Issues Found: ___ (Critical: ___ High: ___ Medium: ___ Low: ___)
Overall Sentiment: [ ] Positive  [ ] Neutral  [ ] Negative
```
