# GDPR Compliance Checklist — Ecossistema Digital

## Data Processing Inventory

### Personal Data Categories Collected
| Category | System | Legal Basis | Retention |
|----------|--------|-------------|-----------|
| Name, DOB, Gender, Nationality | SGC | Legitimate interest (consular services) | Duration of registration + 5 years |
| Passport number, NIF | SGC | Legal obligation (consular law) | Duration of registration + 10 years |
| Email, Phone | SGC | Consent + legitimate interest | Until account deletion |
| Address in Germany | SGC | Legitimate interest | Until update |
| Visa application data | SGC | Legal obligation | 10 years after decision |
| Appointment details | SGC | Contract performance | 2 years after completion |
| IP addresses (logs) | All | Legitimate interest (security) | 90 days |
| Authentication tokens | All | Contract performance | Session duration |
| FCM push tokens | Mobile | Consent | Until revocation |
| Device biometric data | Mobile | Explicit consent | Device-only, never transmitted |

---

## Compliance Checklist

### 1. Lawfulness, Fairness, Transparency (Art. 5(1)(a))
- [x] Privacy policy available in pt/en/de/fr
- [x] Cookie consent banner on SI/WN public sites
- [x] Data processing purposes clearly stated
- [x] Legal basis documented for each processing activity
- [ ] Privacy policy accessible from mobile app settings

### 2. Purpose Limitation (Art. 5(1)(b))
- [x] Data collected only for specified consular purposes
- [x] No data sharing with third parties
- [x] No marketing use of personal data
- [x] Cross-system data sharing limited to operational necessity

### 3. Data Minimisation (Art. 5(1)(c))
- [x] Only necessary fields collected in forms
- [x] Optional fields clearly marked
- [x] File uploads restricted to required document types
- [x] API responses filtered to role-appropriate data

### 4. Accuracy (Art. 5(1)(d))
- [x] Profile self-service update (mobile + SGC portal)
- [x] Data validation at input (email, phone, dates)
- [x] Last-updated timestamp on all records

### 5. Storage Limitation (Art. 5(1)(e))
- [x] Retention periods defined per data category
- [x] Automated log rotation (90 days)
- [ ] Automated data deletion for expired records (scheduled task)
- [ ] Archive policy for completed processes

### 6. Integrity & Confidentiality (Art. 5(1)(f))
- [x] Data encrypted in transit (TLS 1.3)
- [x] Database encrypted at rest (PostgreSQL TDE)
- [x] Passwords hashed (Keycloak bcrypt)
- [x] Mobile tokens in secure keychain
- [x] API authentication via JWT (RS256)
- [x] Role-based access control (RBAC)
- [x] Audit trail for all data modifications

### 7. Data Subject Rights

#### Right of Access (Art. 15)
- [x] Profile screen shows all stored data
- [x] Export endpoint: GET /cidadaos/me/export (JSON)
- [ ] PDF export option

#### Right to Rectification (Art. 16)
- [x] Self-service profile editing
- [x] Admin can correct data in SGC

#### Right to Erasure (Art. 17)
- [ ] Account deletion endpoint: DELETE /cidadaos/me
- [ ] Cascade deletion of related records
- [ ] Anonymization for records with legal retention obligation

#### Right to Data Portability (Art. 20)
- [x] JSON export of personal data
- [ ] Machine-readable format (CSV option)

#### Right to Object (Art. 21)
- [x] Push notification opt-out
- [x] Biometric auth opt-out

### 8. Data Protection by Design (Art. 25)
- [x] Encryption by default
- [x] Minimal data collection
- [x] Access logging enabled
- [x] Separation of public/private data
- [x] No personal data in URLs or logs

### 9. Data Breach Notification (Art. 33-34)
- [x] Monitoring alerts for unauthorized access (Prometheus)
- [x] Incident response procedure documented
- [ ] 72-hour notification process defined
- [ ] DPA contact information documented

### 10. Data Protection Officer
- [ ] DPO designated
- [ ] DPO contact published on privacy page
- [ ] DPO registered with supervisory authority

---

## Action Items
1. Implement automated data retention/deletion service
2. Add PDF export to data portability
3. Implement account deletion cascade
4. Complete 72-hour breach notification procedure
5. Designate and register DPO
6. Add privacy policy link to mobile app settings
