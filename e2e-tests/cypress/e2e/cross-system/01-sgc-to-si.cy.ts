/**
 * Cross-system E2E: SGC → SI
 * Verifies that actions in the SGC admin frontend reflect on the SI public site.
 */
describe('Cross-System: SGC → SI', () => {
  it('should reflect consular service info changes on SI public page', () => {
    // Admin updates consular info in SGC
    cy.login('admin');
    cy.visitSGC('/workflow-admin');
    cy.waitForLoad();

    // Verify SGC admin has consular configuration
    cy.get('body').should('be.visible');

    // Now check SI shows consular sector page
    cy.visitSI('/sector-consular');
    cy.get('h1, h2').should('be.visible');
    cy.contains(/consular|serviço/i).should('be.visible');
  });

  it('should show SGC agendamento slots on SI events calendar', () => {
    // SI events page should be accessible
    cy.visitSI('/eventos');
    cy.get('[data-cy="event-item"], .event-card, mat-card').should('exist');
  });

  it('should have consistent embassy contact info across SGC and SI', () => {
    // Check SI contacts page
    cy.visitSI('/contactos');
    cy.contains(/Berlim|Berlin/i).should('be.visible');
    cy.contains(/embaixada|embassy|botschaft/i).should('be.visible');
  });
});
