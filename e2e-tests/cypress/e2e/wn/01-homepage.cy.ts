describe('WN News Homepage', () => {
  beforeEach(() => {
    cy.visitWN('/');
  });

  it('should display homepage with featured articles', () => {
    cy.get('h1, .hero, [data-cy="featured-article"]').should('be.visible');
  });

  it('should display article cards', () => {
    cy.get('mat-card, .article-card, [data-cy="article-item"]').should('have.length.greaterThan', 0);
  });

  it('should show category navigation', () => {
    cy.get('nav, [data-cy="category-nav"]').should('be.visible');
  });

  it('should display footer with newsletter signup', () => {
    cy.get('footer').scrollIntoView().should('be.visible');
  });
});
