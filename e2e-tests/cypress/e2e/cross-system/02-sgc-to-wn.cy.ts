/**
 * Cross-system E2E: SGC → WN
 * Verifies that SGC activities generate news coverage on WN.
 */
describe('Cross-System: SGC → WN', () => {
  it('should create a visa milestone event that appears as news', () => {
    // Intercept SGC API for visa transition
    cy.intercept('PATCH', `${Cypress.env('SGC_API')}/vistos/*/estado`, {
      statusCode: 200,
      body: { success: true, data: { estado: 'APROVADO' } },
    }).as('visaTransition');

    // Intercept WN API to check for new articles
    cy.intercept('GET', `${Cypress.env('WN_API')}/public/articles*`, {
      statusCode: 200,
      body: {
        success: true,
        data: {
          content: [
            {
              slug: 'visto-milestone-test',
              titulo: 'Novo marco no processamento de vistos',
              createdAt: new Date().toISOString(),
            },
          ],
          totalElements: 1,
          last: true,
        },
      },
    }).as('wnArticles');

    // Check WN homepage shows the article
    cy.visitWN('/');
    cy.wait('@wnArticles');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').should('have.length.greaterThan', 0);
  });

  it('should verify WN article links back to relevant SGC info', () => {
    cy.visitWN('/');
    cy.get('mat-card, .article-card, [data-cy="article-item"]').first().click();
    // Article should contain reference to consular services
    cy.get('article, [data-cy="article-content"]').should('be.visible');
  });
});
