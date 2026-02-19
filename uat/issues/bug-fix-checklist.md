# Bug Fix & Polish Checklist

## Ecossistema Digital — Embaixada de Angola na Alemanha

This checklist covers common bug categories and polish items to verify across all systems before go-live.

---

## 1. Error Handling — All Systems

### Backend APIs (SGC, SI, WN, GPJ)

| # | Check | SGC | SI | WN | GPJ |
|---|-------|-----|----|----|-----|
| 1.1 | 400 Bad Request returns structured error (not stack trace) | [ ] | [ ] | [ ] | [ ] |
| 1.2 | 401 Unauthorized redirects to login | [ ] | [ ] | [ ] | [ ] |
| 1.3 | 403 Forbidden shows "Access Denied" message | [ ] | [ ] | [ ] | [ ] |
| 1.4 | 404 Not Found returns JSON error (not Whitelabel) | [ ] | [ ] | [ ] | [ ] |
| 1.5 | 409 Conflict handled for duplicate entries | [ ] | [ ] | [ ] | [ ] |
| 1.6 | 500 Internal Server Error returns generic message | [ ] | [ ] | [ ] | [ ] |
| 1.7 | Validation errors return field-level messages | [ ] | [ ] | [ ] | [ ] |
| 1.8 | No stack traces in production responses | [ ] | [ ] | [ ] | [ ] |
| 1.9 | CORS headers correct for frontend origins | [ ] | [ ] | [ ] | [ ] |
| 1.10 | Rate limiting returns 429 with Retry-After header | [ ] | [ ] | [ ] | [ ] |

### Frontend Applications

| # | Check | SGC-FE | SI-FE | WN-FE | GPJ-FE | Mobile |
|---|-------|--------|-------|-------|--------|--------|
| 1.11 | Network error shows retry option | [ ] | [ ] | [ ] | [ ] | [ ] |
| 1.12 | Form validation shows inline errors | [ ] | [ ] | [ ] | [ ] | [ ] |
| 1.13 | Session expired → redirect to login | [ ] | [ ] | [ ] | [ ] | [ ] |
| 1.14 | Global error boundary catches crashes | [ ] | [ ] | [ ] | [ ] | [ ] |
| 1.15 | Error messages in user's language | [ ] | [ ] | [ ] | [ ] | [ ] |

---

## 2. Loading States

| # | Check | SGC-FE | SI-FE | WN-FE | GPJ-FE | Mobile |
|---|-------|--------|-------|-------|--------|--------|
| 2.1 | Page load shows spinner/skeleton | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2.2 | Table/list shows loading skeleton | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2.3 | Form submission shows loading on button | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2.4 | File upload shows progress bar | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2.5 | Button disabled during submission | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2.6 | No double-submit on rapid clicks | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2.7 | Pull-to-refresh works (mobile) | — | — | — | — | [ ] |
| 2.8 | Infinite scroll shows footer spinner | [ ] | [ ] | [ ] | [ ] | [ ] |

---

## 3. Empty States

| # | Check | SGC-FE | SI-FE | WN-FE | GPJ-FE | Mobile |
|---|-------|--------|-------|-------|--------|--------|
| 3.1 | Empty list shows illustration + message | [ ] | [ ] | [ ] | [ ] | [ ] |
| 3.2 | Empty search results with suggestion | [ ] | [ ] | [ ] | [ ] | [ ] |
| 3.3 | No notifications shows "all caught up" | [ ] | — | — | [ ] | [ ] |
| 3.4 | Empty dashboard handles zero data | [ ] | — | — | [ ] | [ ] |
| 3.5 | New user sees onboarding hints | [ ] | — | — | [ ] | [ ] |

---

## 4. Visual Polish

### Typography & Spacing

| # | Check | Status |
|---|-------|--------|
| 4.1 | Consistent font family across all systems | [ ] |
| 4.2 | Heading hierarchy (h1 > h2 > h3) correct | [ ] |
| 4.3 | Consistent padding/margin (8px grid) | [ ] |
| 4.4 | No orphaned words in titles | [ ] |
| 4.5 | Long text truncated with ellipsis where appropriate | [ ] |
| 4.6 | Portuguese accents (ã, ç, é, ô) render correctly | [ ] |
| 4.7 | German umlauts (ä, ö, ü, ß) render correctly | [ ] |

### Colors & Branding

| # | Check | Status |
|---|-------|--------|
| 4.8 | Embassy color palette consistent (primary, secondary, accent) | [ ] |
| 4.9 | Status colors consistent: green=success, red=error, yellow=warning | [ ] |
| 4.10 | Angola flag colors used appropriately (red, black, yellow) | [ ] |
| 4.11 | Links have consistent color and hover state | [ ] |
| 4.12 | Disabled elements clearly distinguishable | [ ] |
| 4.13 | Focus indicators visible for accessibility | [ ] |

### Icons & Images

| # | Check | Status |
|---|-------|--------|
| 4.14 | Icons from same icon set (consistent style) | [ ] |
| 4.15 | No broken images (404 images) | [ ] |
| 4.16 | Images have alt text | [ ] |
| 4.17 | Favicon set for all frontends | [ ] |
| 4.18 | Embassy logo/coat of arms high resolution | [ ] |

---

## 5. Responsive Design

| # | Check | SGC-FE | SI-FE | WN-FE | GPJ-FE |
|---|-------|--------|-------|-------|--------|
| 5.1 | Desktop (1920×1080) — no overflow | [ ] | [ ] | [ ] | [ ] |
| 5.2 | Laptop (1366×768) — no overlap | [ ] | [ ] | [ ] | [ ] |
| 5.3 | Tablet (768×1024) — layout adapts | [ ] | [ ] | [ ] | [ ] |
| 5.4 | Mobile (375×812) — usable layout | [ ] | [ ] | [ ] | [ ] |
| 5.5 | Tables scroll horizontally (no break) | [ ] | [ ] | [ ] | [ ] |
| 5.6 | Forms single-column on mobile | [ ] | [ ] | [ ] | [ ] |
| 5.7 | Navigation collapses on small screens | [ ] | [ ] | [ ] | [ ] |
| 5.8 | Modal/dialog fits viewport | [ ] | [ ] | [ ] | [ ] |
| 5.9 | Print stylesheet (important pages) | [ ] | [ ] | [ ] | [ ] |

---

## 6. Edge Cases

### Data Handling

| # | Check | Status |
|---|-------|--------|
| 6.1 | Very long names (>100 chars) don't break layout | [ ] |
| 6.2 | Special characters in names (O'Brien, São Tomé) | [ ] |
| 6.3 | Empty optional fields don't show "null" | [ ] |
| 6.4 | Dates display in correct locale format | [ ] |
| 6.5 | Currency values formatted correctly (EUR) | [ ] |
| 6.6 | Phone numbers with international prefix (+244, +49) | [ ] |
| 6.7 | Email validation (standard + edge cases) | [ ] |
| 6.8 | Passport number formats (various countries) | [ ] |

### Concurrent Usage

| # | Check | Status |
|---|-------|--------|
| 6.9 | Two users editing same record — optimistic locking | [ ] |
| 6.10 | Appointment slot booked by two users simultaneously | [ ] |
| 6.11 | Stale data warning after concurrent edit | [ ] |

### Browser Compatibility

| # | Check | SGC-FE | SI-FE | WN-FE | GPJ-FE |
|---|-------|--------|-------|-------|--------|
| 6.12 | Chrome (latest) | [ ] | [ ] | [ ] | [ ] |
| 6.13 | Firefox (latest) | [ ] | [ ] | [ ] | [ ] |
| 6.14 | Safari (latest) | [ ] | [ ] | [ ] | [ ] |
| 6.15 | Edge (latest) | [ ] | [ ] | [ ] | [ ] |

---

## 7. Accessibility (WCAG 2.1 AA)

| # | Check | Status |
|---|-------|--------|
| 7.1 | All interactive elements keyboard accessible | [ ] |
| 7.2 | Tab order logical (left→right, top→bottom) | [ ] |
| 7.3 | Focus visible on all interactive elements | [ ] |
| 7.4 | Color contrast ratio ≥ 4.5:1 for text | [ ] |
| 7.5 | ARIA labels on icon-only buttons | [ ] |
| 7.6 | Form labels associated with inputs | [ ] |
| 7.7 | Error messages linked to fields (aria-describedby) | [ ] |
| 7.8 | Page titles unique and descriptive | [ ] |
| 7.9 | Skip to main content link | [ ] |
| 7.10 | No auto-playing media | [ ] |

---

## 8. Performance Quick Checks

| # | Check | Target | Status |
|---|-------|--------|--------|
| 8.1 | SI homepage load < 3s | 3s | [ ] |
| 8.2 | WN homepage load < 3s | 3s | [ ] |
| 8.3 | SGC dashboard load < 3s | 3s | [ ] |
| 8.4 | GPJ dashboard load < 3s | 3s | [ ] |
| 8.5 | Mobile app cold start < 4s | 4s | [ ] |
| 8.6 | API p95 response < 500ms | 500ms | [ ] |
| 8.7 | Image lazy loading enabled | Yes | [ ] |
| 8.8 | JS bundle < 500KB gzipped | 500KB | [ ] |

---

## 9. Security Quick Checks

| # | Check | Status |
|---|-------|--------|
| 9.1 | No sensitive data in console.log | [ ] |
| 9.2 | No API keys in frontend source | [ ] |
| 9.3 | HTTPS enforced (HTTP redirects) | [ ] |
| 9.4 | Security headers present (CSP, X-Frame-Options, etc.) | [ ] |
| 9.5 | Session timeout configured (30 min idle) | [ ] |
| 9.6 | CSRF protection on forms | [ ] |
| 9.7 | File upload validates type and size | [ ] |
| 9.8 | SQL injection test on search fields | [ ] |
| 9.9 | XSS test on text inputs | [ ] |

---

## Summary

| Category | Total | Pass | Fail | N/A |
|----------|-------|------|------|-----|
| Error Handling | 15 | | | |
| Loading States | 8 | | | |
| Empty States | 5 | | | |
| Visual Polish | 18 | | | |
| Responsive | 9 | | | |
| Edge Cases | 15 | | | |
| Accessibility | 10 | | | |
| Performance | 8 | | | |
| Security | 9 | | | |
| **TOTAL** | **97** | | | |

**Overall Pass Rate:** ____%

**Go-Live Readiness:** [ ] READY  [ ] READY WITH CONDITIONS  [ ] NOT READY
