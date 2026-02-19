# UAT Scenarios — SI (Site Institucional)

## Tester Role: Assessor de Comunicação, Consul
## System: https://staging-si.embaixada-angola.site

---

### SI-01: Public Homepage

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to SI URL | Homepage loads within 3 seconds | [ ] |
| 2 | Verify hero section | Embassy banner/image displayed | [ ] |
| 3 | Verify navigation menu | Links: Home, Embaixador, Serviços, Eventos, Contactos | [ ] |
| 4 | Verify footer | Address, phone, email, social media links | [ ] |
| 5 | Check mobile responsive | Menu collapses to hamburger on mobile | [ ] |

**Notes:** _______________________________________________________________

---

### SI-02: Ambassador Page

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Click "Embaixador" | Ambassador page loads | [ ] |
| 2 | Verify photo | Ambassador photo displayed | [ ] |
| 3 | Verify biography | Full bio text rendered correctly | [ ] |
| 4 | Verify accreditation info | Diplomatic details shown | [ ] |

**Notes:** _______________________________________________________________

---

### SI-03: Consular Services Page

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to services page | List of consular services | [ ] |
| 2 | Verify service categories | Vistos, Passaportes, Registo Civil, Notariado, etc. | [ ] |
| 3 | Click on a service | Detail page with requirements and procedures | [ ] |
| 4 | Verify downloadable forms | PDF forms download correctly | [ ] |
| 5 | Verify pricing table | Service fees displayed in EUR | [ ] |

**Notes:** _______________________________________________________________

---

### SI-04: Events Management

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to events page | Upcoming events listed chronologically | [ ] |
| 2 | Click on an event | Event detail: title, date, location, description | [ ] |
| 3 | Verify past events section | Past events accessible in archive | [ ] |
| 4 | Admin: create new event | Event form with title, date, location, description, image | [ ] |
| 5 | Admin: publish event | Event appears on public page | [ ] |
| 6 | Admin: edit event | Changes reflected immediately | [ ] |
| 7 | Admin: unpublish event | Event removed from public listing | [ ] |

**Notes:** _______________________________________________________________

---

### SI-05: Content Management (Admin)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login as editor | Admin panel accessible | [ ] |
| 2 | Navigate to pages list | All pages listed with status | [ ] |
| 3 | Edit a page | Rich text editor loads with content | [ ] |
| 4 | Add image to page | Image uploads and displays in preview | [ ] |
| 5 | Save as draft | Page saved without publishing | [ ] |
| 6 | Publish page | Page visible on public site | [ ] |
| 7 | Verify slug/URL | Clean URL with correct slug | [ ] |

**Notes:** _______________________________________________________________

---

### SI-06: Multilingual (pt/en/de)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Verify language switcher | PT/EN/DE options visible | [ ] |
| 2 | Switch to English | All UI elements in English | [ ] |
| 3 | Switch to German | All UI elements in German | [ ] |
| 4 | Switch back to Portuguese | All UI elements in Portuguese | [ ] |
| 5 | Verify content translation | Page content changes per language | [ ] |
| 6 | Verify URL structure | URL includes language prefix (/pt/, /en/, /de/) | [ ] |
| 7 | Verify default language | Portuguese as default for first visit | [ ] |

**Notes:** _______________________________________________________________

---

### SI-07: Contact Page

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to contact page | Contact info displayed | [ ] |
| 2 | Verify address | Full embassy address with Google Maps embed | [ ] |
| 3 | Verify phone numbers | Phone numbers with click-to-call | [ ] |
| 4 | Verify email | Email with click-to-email | [ ] |
| 5 | Verify opening hours | Horários de funcionamento displayed | [ ] |
| 6 | Submit contact form | Form sends, confirmation shown | [ ] |

**Notes:** _______________________________________________________________

---

### SI-08: SEO & Accessibility

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Check page title | "Embaixada de Angola na Alemanha" in title | [ ] |
| 2 | Check meta description | Relevant description present | [ ] |
| 3 | Check Open Graph tags | Correct og:title, og:image, og:description | [ ] |
| 4 | Keyboard navigation | All interactive elements reachable via Tab | [ ] |
| 5 | Screen reader test | Alt text on images, ARIA labels on buttons | [ ] |
| 6 | Color contrast | Text readable on all backgrounds | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| SI-01 | [ ] Pass [ ] Fail | | |
| SI-02 | [ ] Pass [ ] Fail | | |
| SI-03 | [ ] Pass [ ] Fail | | |
| SI-04 | [ ] Pass [ ] Fail | | |
| SI-05 | [ ] Pass [ ] Fail | | |
| SI-06 | [ ] Pass [ ] Fail | | |
| SI-07 | [ ] Pass [ ] Fail | | |
| SI-08 | [ ] Pass [ ] Fail | | |

**Overall SI Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
