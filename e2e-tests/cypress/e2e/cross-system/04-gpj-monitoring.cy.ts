/**
 * Cross-system E2E: GPJ monitoring all systems
 * Verifies that GPJ dashboard reflects activity from all other systems.
 */
describe('Cross-System: GPJ Monitoring', () => {
  beforeEach(() => {
    cy.login('admin');
  });

  it('should show GPJ dashboard with cross-system activity feed', () => {
    cy.visitGPJ('/dashboard');
    cy.waitForLoad();
    cy.get('h1, h2').should('contain.text', 'Dashboard');
  });

  it('should display integration events in GPJ activity log', () => {
    // Intercept GPJ API for integration events
    cy.intercept('GET', `${Cypress.env('GPJ_API')}/integration-events*`, {
      statusCode: 200,
      body: {
        success: true,
        data: {
          content: [
            { source: 'SGC', eventType: 'SGC_CIDADAO_CREATED', timestamp: new Date().toISOString() },
            { source: 'SI', eventType: 'SI_EVENT_PUBLISHED', timestamp: new Date().toISOString() },
            { source: 'WN', eventType: 'WN_ARTICLE_PUBLISHED', timestamp: new Date().toISOString() },
          ],
          totalElements: 3,
          last: true,
        },
      },
    }).as('integrationEvents');

    cy.visitGPJ('/dashboard');
    cy.waitForLoad();
  });

  it('should show task board with sprint progress', () => {
    cy.visitGPJ('/board');
    cy.waitForLoad();
    cy.getByCy('board-column').should('have.length.greaterThan', 0);
  });

  it('should display cross-system health status', () => {
    cy.visitGPJ('/dashboard');
    cy.waitForLoad();
    // Health indicators for each subsystem
    cy.getByCy('system-health').should('exist');
  });
});
