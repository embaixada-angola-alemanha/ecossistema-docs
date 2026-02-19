describe('WN Article Detail', () => {
  it('should navigate to article from homepage', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    cy.url().should('match', /\/artigo\/.+/);
  });

  it('should display article title and content', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    cy.get('h1, [data-cy="article-title"]').should('be.visible');
    cy.get('[data-cy="article-content"], .article-body, article').should('be.visible');
  });

  it('should display article metadata (author, date)', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    cy.get('[data-cy="article-author"], .author').should('exist');
    cy.get('[data-cy="article-date"], time').should('exist');
  });

  it('should display share buttons', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    cy.get('[data-cy="share-buttons"], .share-links').should('exist');
  });

  it('should show related articles', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    cy.get('[data-cy="related-articles"]').scrollIntoView().should('exist');
  });
});
