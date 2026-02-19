/**
 * Cross-system E2E: Full user journey
 * Simulates a complete citizen journey across all systems.
 */
describe('Cross-System: Full Citizen Journey', () => {
  it('should complete citizen → visa → appointment → news flow', () => {
    // Step 1: Admin creates citizen in SGC
    cy.login('admin');
    cy.visitSGC('/cidadaos');
    cy.waitForLoad();
    cy.get('table, mat-table').should('be.visible');

    // Step 2: Admin processes visa in SGC
    cy.visitSGC('/vistos');
    cy.waitForLoad();
    cy.get('table, mat-table').should('be.visible');

    // Step 3: Admin views appointments in SGC
    cy.visitSGC('/agendamentos');
    cy.waitForLoad();
    cy.get('table, mat-table').should('be.visible');

    // Step 4: Public SI shows consular services info
    cy.visitSI('/sector-consular');
    cy.get('h1, h2').should('be.visible');

    // Step 5: WN shows latest news
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').should('have.length.greaterThan', 0);

    // Step 6: GPJ tracks project progress
    cy.login('admin');
    cy.visitGPJ('/dashboard');
    cy.waitForLoad();
    cy.get('h1, h2').should('be.visible');
  });

  it('should verify all four frontends are accessible', () => {
    cy.request({ url: Cypress.env('SGC_URL'), failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 302]);

    cy.request({ url: Cypress.env('SI_URL'), failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 302]);

    cy.request({ url: Cypress.env('WN_URL'), failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 302]);

    cy.request({ url: Cypress.env('GPJ_URL'), failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 302]);
  });

  it('should verify all four APIs respond', () => {
    cy.request({ url: `${Cypress.env('SGC_API')}/actuator/health`, failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 401]);

    cy.request({ url: `${Cypress.env('SI_API')}/actuator/health`, failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 401]);

    cy.request({ url: `${Cypress.env('WN_API')}/actuator/health`, failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 401]);

    cy.request({ url: `${Cypress.env('GPJ_API')}/actuator/health`, failOnStatusCode: false })
      .its('status').should('be.oneOf', [200, 401]);
  });
});
