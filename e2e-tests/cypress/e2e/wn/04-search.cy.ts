describe('WN Search', () => {
  it('should navigate to search page', () => {
    cy.visitWN('/pesquisa');
    cy.url().should('include', '/pesquisa');
  });

  it('should search for articles', () => {
    cy.visitWN('/pesquisa');
    cy.get('input[type="search"], input[type="text"], [data-cy="search-input"]').type('Angola');
    cy.get('mat-card, .article-card, [data-cy="article-item"], [data-cy="search-result"]')
      .should('have.length.greaterThan', 0);
  });

  it('should show no results for nonsense query', () => {
    cy.visitWN('/pesquisa');
    cy.get('input[type="search"], input[type="text"], [data-cy="search-input"]').type('xyzzy12345{enter}');
    cy.contains(/sem resultado|no result|nenhum/i).should('be.visible');
  });

  it('should handle 404 for unknown article slug', () => {
    cy.visitWN('/artigo/non-existent-article-slug');
    cy.contains(/não encontrad|not found|404|erro/i).should('be.visible');
  });
});
