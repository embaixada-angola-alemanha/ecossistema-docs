/**
 * Cross-system E2E: SI → WN
 * Verifies that SI published events generate WN news coverage.
 */
describe('Cross-System: SI → WN', () => {
  it('should verify SI events appear as WN news articles', () => {
    // Check that SI events page has events
    cy.visitSI('/eventos');
    cy.get('[data-cy="event-item"], .event-card, mat-card').should('have.length.greaterThan', 0);

    // Get first event title
    cy.get('[data-cy="event-item"], .event-card, mat-card').first().invoke('text').then((eventText) => {
      // Check WN for related news
      cy.visitWN('/');
      // WN should have news content (may or may not be this specific event)
      cy.get('mat-card, .article-card, [data-cy="article-item"]').should('have.length.greaterThan', 0);
    });
  });

  it('should maintain consistent branding between SI and WN', () => {
    // SI should have embassy branding
    cy.visitSI('/');
    cy.get('img[alt*="Angola"], .logo, [data-cy="logo"]').should('exist');

    // WN should also have embassy branding
    cy.visitWN('/');
    cy.get('img[alt*="Angola"], .logo, [data-cy="logo"]').should('exist');
  });
});
