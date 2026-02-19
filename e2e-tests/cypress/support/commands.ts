/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /** Login via mocked Keycloak (for admin frontends: SGC, GPJ) */
    login(role?: 'admin' | 'consul' | 'officer' | 'viewer'): Chainable<void>;
    /** Get element by data-cy attribute */
    getByCy(selector: string): Chainable<JQuery<HTMLElement>>;
    /** Wait for Angular loading spinners to disappear */
    waitForLoad(): Chainable<void>;
    /** Visit SGC frontend */
    visitSGC(path?: string): Chainable<void>;
    /** Visit SI frontend */
    visitSI(path?: string): Chainable<void>;
    /** Visit WN frontend */
    visitWN(path?: string): Chainable<void>;
    /** Visit GPJ frontend */
    visitGPJ(path?: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (role = 'admin') => {
  const roleMap: Record<string, string[]> = {
    admin: ['ADMIN', 'CONSUL', 'OFFICER', 'VIEWER'],
    consul: ['CONSUL', 'OFFICER', 'VIEWER'],
    officer: ['OFFICER', 'VIEWER'],
    viewer: ['VIEWER'],
  };

  const mockToken = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    token_type: 'Bearer',
    expires_in: 3600,
  };

  const mockUserInfo = {
    sub: '00000000-0000-0000-0000-000000000001',
    preferred_username: 'e2e-test-user',
    given_name: 'E2E',
    family_name: 'Tester',
    email: 'e2e@embaixada-angola.de',
    realm_access: { roles: roleMap[role] },
    resource_access: {
      'sgc-app': { roles: roleMap[role] },
      'gpj-app': { roles: roleMap[role] },
    },
  };

  cy.intercept('POST', '**/realms/ecossistema/protocol/openid-connect/token', mockToken);
  cy.intercept('GET', '**/realms/ecossistema/protocol/openid-connect/userinfo', mockUserInfo);

  // Set local storage to simulate logged-in state
  window.localStorage.setItem('sgc-lang', 'pt');
  window.localStorage.setItem('gpj-lang', 'pt');
});

Cypress.Commands.add('getByCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('waitForLoad', () => {
  cy.get('eco-loading-spinner', { timeout: 100 }).should('not.exist');
});

Cypress.Commands.add('visitSGC', (path = '/') => {
  cy.visit(`${Cypress.env('SGC_URL')}${path}`);
});

Cypress.Commands.add('visitSI', (path = '/') => {
  cy.visit(`${Cypress.env('SI_URL')}${path}`);
});

Cypress.Commands.add('visitWN', (path = '/') => {
  cy.visit(`${Cypress.env('WN_URL')}${path}`);
});

Cypress.Commands.add('visitGPJ', (path = '/') => {
  cy.visit(`${Cypress.env('GPJ_URL')}${path}`);
});
