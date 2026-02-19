# Keycloak Security Configuration Review

## Realm: ecossistema

### 1. Authentication Settings
- [x] Password policy enforced (min 12 chars, uppercase, lowercase, digit, special)
- [x] Brute force detection enabled (max 5 failures, lockout 15 min)
- [x] OTP/2FA available for admin accounts
- [x] Session idle timeout: 30 minutes
- [x] Session max lifespan: 8 hours
- [x] Remember-me disabled for admin clients
- [x] Login with email enabled

### 2. Client Configuration

#### sgc-app (Admin Frontend)
- [x] Access type: confidential
- [x] Standard flow enabled (Authorization Code + PKCE)
- [x] Direct access grants: DISABLED
- [x] Service accounts: DISABLED
- [x] Valid redirect URIs: `http://localhost:3001/*`, `https://sgc.embaixada-angola.site/*`
- [x] Web origins: `http://localhost:3001`, `https://sgc.embaixada-angola.site`
- [x] CORS headers configured

#### gpj-app (Project Management Frontend)
- [x] Access type: confidential
- [x] Same security settings as sgc-app
- [x] Valid redirect URIs restricted to GPJ frontend

#### mobile-app (React Native)
- [x] Access type: public (required for PKCE mobile flow)
- [x] PKCE enforced (S256)
- [x] Valid redirect URIs: `ao.gov.embaixada.mobile://callback`
- [x] No client secret (public client)
- [x] Refresh token rotation enabled
- [x] Refresh token max reuse: 0 (single use)

#### si-public / wn-public (Public API clients)
- [x] Access type: bearer-only
- [x] No login flows (API only)
- [x] Minimal scopes

### 3. Role Hierarchy
- [x] ADMIN > CONSUL > OFFICER > VIEWER (role inheritance)
- [x] Roles assigned per-client (resource_access)
- [x] Default roles: none (explicit assignment required)
- [x] Composite roles properly configured

### 4. Token Configuration
- [x] Access token lifespan: 5 minutes
- [x] Refresh token lifespan: 30 minutes
- [x] ID token includes: sub, preferred_username, email, realm_access, resource_access
- [x] Token signature: RS256
- [x] JWKS endpoint exposed for backend verification

### 5. Security Headers
- [x] Content-Security-Policy configured
- [x] X-Frame-Options: SAMEORIGIN
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: no-referrer

### 6. Admin Console Security
- [x] Admin console on separate realm (master)
- [x] Admin password changed from default
- [x] Admin MFA enabled
- [x] Admin audit logging enabled

### 7. Event Logging
- [x] Login events: enabled
- [x] Login errors: enabled
- [x] Admin events: enabled
- [x] Event expiration: 30 days
- [x] Events forwarded to monitoring (Loki)

### 8. Recommendations
- [ ] Enable User Profile validation for registration
- [ ] Configure IP-based rate limiting at reverse proxy level
- [ ] Review client scopes quarterly
- [ ] Rotate client secrets every 90 days
- [ ] Enable FIDO2/WebAuthn for admin users
