describe('WN Categories & Tags', () => {
  it('should navigate to category page', () => {
    cy.visitWN('/');
    cy.get('[data-cy="category-nav"] a, nav a').contains(/Política|Economia|Cultura/i).first().click();
    cy.url().should('match', /\/categoria\/.+/);
    cy.get('h1, h2').should('be.visible');
  });

  it('should display articles filtered by category', () => {
    cy.visitWN('/');
    cy.get('[data-cy="category-nav"] a, nav a').first().click();
    cy.get('mat-card, .article-card, [data-cy="article-item"]').should('have.length.greaterThan', 0);
  });

  it('should navigate to tag page from article', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    cy.get('[data-cy="article-tags"] a, .tag-chip a, mat-chip a').first().click();
    cy.url().should('match', /\/tag\/.+/);
  });

  it('should navigate to archive page', () => {
    cy.visitWN('/arquivo');
    cy.url().should('include', '/arquivo');
    cy.get('h1, h2').should('be.visible');
  });
});
