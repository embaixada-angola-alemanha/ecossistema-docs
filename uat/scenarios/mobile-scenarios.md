# UAT Scenarios — Mobile App (React Native)

## Tester Role: Funcionário Consular (as citizen), IT Lead
## Platform: iOS (TestFlight) + Android (Firebase App Distribution)

---

### MOB-01: App Installation & First Launch

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Install from TestFlight/Firebase | App installs successfully | [ ] |
| 2 | Launch app | Splash screen → Welcome/Login | [ ] |
| 3 | Verify app icon | Embassy logo displayed correctly | [ ] |
| 4 | Verify permissions prompt | Camera, notifications permission requested | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-02: Authentication

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Tap "Entrar" | Keycloak login WebView opens | [ ] |
| 2 | Enter credentials | Login processes | [ ] |
| 3 | Successful login | Redirected to home screen with user info | [ ] |
| 4 | Close and reopen app | Still authenticated (token persisted) | [ ] |
| 5 | Tap "Sair" (logout) | Token cleared, back to login screen | [ ] |
| 6 | Invalid credentials | Error message shown, stays on login | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-03: Home & Navigation

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Verify bottom tabs | Home, Vistos, Agendamentos, Notícias, Perfil | [ ] |
| 2 | Tap each tab | Correct screen loads | [ ] |
| 3 | Verify home screen | Welcome message, quick action cards, recent notifications | [ ] |
| 4 | Pull to refresh | Data refreshes with loading indicator | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-04: Profile Management

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to profile | Personal data displayed | [ ] |
| 2 | Tap "Editar Perfil" | Edit form with current values | [ ] |
| 3 | Change phone number | Updated successfully | [ ] |
| 4 | Change profile photo | Camera/gallery picker, photo uploads | [ ] |
| 5 | Verify documents section | Uploaded documents listed | [ ] |
| 6 | Upload document from phone | File picker → upload → confirmation | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-05: Visa Application

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to Vistos tab | List of user's visas (or empty state) | [ ] |
| 2 | Tap "Solicitar Visto" | Visa type selection grid (7 types) | [ ] |
| 3 | Select TURISMO | Visa application form opens | [ ] |
| 4 | Fill all required fields | Motivo, dates, alojamento accepted | [ ] |
| 5 | Tap "Submeter" | Confirmation, visa appears in list as SUBMETIDO | [ ] |
| 6 | Tap "Guardar Rascunho" | Draft saved offline | [ ] |
| 7 | Close/reopen app | Draft still available to resume | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-06: Visa Tracking

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Tap on a visa in list | Tracking detail screen | [ ] |
| 2 | Verify status badge | Correct color and text for current estado | [ ] |
| 3 | Verify timeline | All state transitions with dates | [ ] |
| 4 | Verify visa summary | Type, reference, dates, motivo shown | [ ] |
| 5 | Verify terminal states | Rejected/expired show appropriate banner | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-07: Appointment Booking

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to Agendamentos tab | Upcoming/past appointments listed | [ ] |
| 2 | Tap "Novo Agendamento" | Type selection screen | [ ] |
| 3 | Select type: ENTREGA_PASSAPORTE | Date selection calendar shown | [ ] |
| 4 | Select date | Available time slots displayed | [ ] |
| 5 | Select time slot | Confirmation step with summary | [ ] |
| 6 | Tap "Confirmar" | Appointment created, appears in list | [ ] |
| 7 | Verify QR code | QR icon on confirmed appointment | [ ] |
| 8 | Tap QR code | Full QR code displayed for check-in | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-08: Appointment Management

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Tap on appointment | Detail view with full info | [ ] |
| 2 | Tap "Cancelar" | Confirmation alert shown | [ ] |
| 3 | Confirm cancellation | Appointment marked CANCELADO | [ ] |
| 4 | Verify in past tab | Cancelled appointment in history | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-09: News Feed

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to Notícias tab | Latest articles in card layout | [ ] |
| 2 | Pull to refresh | New articles load | [ ] |
| 3 | Scroll down | Infinite scroll / pagination | [ ] |
| 4 | Tap on article | Full article detail view | [ ] |
| 5 | Verify images | Article images load correctly | [ ] |
| 6 | Share article | Share sheet opens with article link | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-10: Push Notifications

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Trigger visa state change (from SGC) | Push notification received on device | [ ] |
| 2 | Tap notification | App opens to relevant visa/appointment | [ ] |
| 3 | Trigger appointment reminder | Notification with appointment details | [ ] |
| 4 | Verify notification settings | Can enable/disable in Settings | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-11: Offline Mode

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Enable airplane mode | No network indicator shown | [ ] |
| 2 | Navigate through app | Cached data displayed | [ ] |
| 3 | Try to submit visa | Queued for sync, user notified | [ ] |
| 4 | Disable airplane mode | Pending operations sync automatically | [ ] |
| 5 | Verify synced data | Visa/appointment created successfully | [ ] |

**Notes:** _______________________________________________________________

---

### MOB-12: Language & Settings

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to Settings | Language, notifications, about sections | [ ] |
| 2 | Switch to English | All UI in English | [ ] |
| 3 | Switch to German | All UI in German | [ ] |
| 4 | Switch to French | All UI in French | [ ] |
| 5 | Switch back to Portuguese | All UI in Portuguese | [ ] |
| 6 | Verify "Sobre" section | App version, legal info | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| MOB-01 | [ ] Pass [ ] Fail | | |
| MOB-02 | [ ] Pass [ ] Fail | | |
| MOB-03 | [ ] Pass [ ] Fail | | |
| MOB-04 | [ ] Pass [ ] Fail | | |
| MOB-05 | [ ] Pass [ ] Fail | | |
| MOB-06 | [ ] Pass [ ] Fail | | |
| MOB-07 | [ ] Pass [ ] Fail | | |
| MOB-08 | [ ] Pass [ ] Fail | | |
| MOB-09 | [ ] Pass [ ] Fail | | |
| MOB-10 | [ ] Pass [ ] Fail | | |
| MOB-11 | [ ] Pass [ ] Fail | | |
| MOB-12 | [ ] Pass [ ] Fail | | |

**Overall Mobile Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
