# UAT Scenarios — WN (Web Notícias)

## Tester Role: Assessor de Comunicação
## System: https://staging-wn.embaixada-angola.de

---

### WN-01: Public Homepage

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to WN URL | News homepage loads within 3 seconds | [ ] |
| 2 | Verify featured articles | Hero section with latest featured article | [ ] |
| 3 | Verify article grid | Recent articles in card layout with thumbnails | [ ] |
| 4 | Verify categories sidebar | Category list with article counts | [ ] |
| 5 | Verify pagination | "Load more" or pagination at bottom | [ ] |

**Notes:** _______________________________________________________________

---

### WN-02: Article Detail

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Click on article card | Article detail page loads | [ ] |
| 2 | Verify title | Full title displayed | [ ] |
| 3 | Verify metadata | Author, date, category, reading time | [ ] |
| 4 | Verify body content | Rich text with images rendered correctly | [ ] |
| 5 | Verify tags | Tags displayed and clickable | [ ] |
| 6 | Verify social sharing | Share buttons (Facebook, Twitter, WhatsApp) | [ ] |
| 7 | Verify related articles | Related articles section at bottom | [ ] |
| 8 | Verify SEO-friendly URL | URL contains article slug | [ ] |

**Notes:** _______________________________________________________________

---

### WN-03: Category & Tag Navigation

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Click on a category | Filtered articles for that category | [ ] |
| 2 | Verify category header | Category name and description shown | [ ] |
| 3 | Click on a tag | Articles with that tag displayed | [ ] |
| 4 | Verify breadcrumbs | Home > Category > Article navigation | [ ] |

**Notes:** _______________________________________________________________

---

### WN-04: Search

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Click search icon | Search input expands/appears | [ ] |
| 2 | Type search query | Results shown as-you-type or on Enter | [ ] |
| 3 | Verify search results | Relevant articles with highlighted matches | [ ] |
| 4 | Search with no results | "Nenhum resultado" message shown | [ ] |
| 5 | Search with special chars | No errors, properly escaped | [ ] |

**Notes:** _______________________________________________________________

---

### WN-05: Article Management (Admin)

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Login as editor | Admin panel accessible | [ ] |
| 2 | Navigate to articles list | All articles with status filter | [ ] |
| 3 | Click "Novo Artigo" | Article editor opens | [ ] |
| 4 | Fill title + slug | Slug auto-generated from title | [ ] |
| 5 | Write content in rich editor | Text formatting, headings, lists work | [ ] |
| 6 | Insert image | Image upload and embed works | [ ] |
| 7 | Select category | Category dropdown with existing categories | [ ] |
| 8 | Add tags | Tag input with autocomplete | [ ] |
| 9 | Write resumo (summary) | Summary field accepts text | [ ] |
| 10 | Save as DRAFT | Article saved, not visible publicly | [ ] |
| 11 | Preview | Preview shows final appearance | [ ] |
| 12 | Publish | Article visible on public homepage | [ ] |

**Notes:** _______________________________________________________________

---

### WN-06: Article Edit & Unpublish

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Open published article in admin | Edit view with current content | [ ] |
| 2 | Edit title and body | Changes reflected on save | [ ] |
| 3 | Change category | Article moves to new category | [ ] |
| 4 | Unpublish (set to DRAFT) | Article no longer on public site | [ ] |
| 5 | Verify 404 | Direct URL to unpublished → 404 or redirect | [ ] |

**Notes:** _______________________________________________________________

---

### WN-07: Media Management

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Navigate to media library | Uploaded images shown in grid | [ ] |
| 2 | Upload new image | Image uploaded with thumbnail | [ ] |
| 3 | Upload large image (>5MB) | Resized/compressed automatically or warning | [ ] |
| 4 | Delete unused image | Image removed from library | [ ] |
| 5 | Verify image optimization | Images served in WebP/optimized format | [ ] |

**Notes:** _______________________________________________________________

---

### WN-08: RSS & Newsletter Integration

| Step | Action | Expected Result | Pass? |
|------|--------|----------------|-------|
| 1 | Access RSS feed URL | Valid XML feed with latest articles | [ ] |
| 2 | Verify feed items | Title, link, description, pubDate present | [ ] |
| 3 | Newsletter subscribe | Email captured, confirmation sent | [ ] |

**Notes:** _______________________________________________________________

---

## Summary

| Scenario | Status | Tester | Date |
|----------|--------|--------|------|
| WN-01 | [ ] Pass [ ] Fail | | |
| WN-02 | [ ] Pass [ ] Fail | | |
| WN-03 | [ ] Pass [ ] Fail | | |
| WN-04 | [ ] Pass [ ] Fail | | |
| WN-05 | [ ] Pass [ ] Fail | | |
| WN-06 | [ ] Pass [ ] Fail | | |
| WN-07 | [ ] Pass [ ] Fail | | |
| WN-08 | [ ] Pass [ ] Fail | | |

**Overall WN Result:** [ ] APPROVED  [ ] APPROVED WITH CONDITIONS  [ ] FAILED

**Conditions:** _______________________________________________________________
