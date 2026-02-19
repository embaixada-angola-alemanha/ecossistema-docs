describe('SI Language Switching', () => {
  beforeEach(() => {
    cy.visitSI('/');
  });

  it('should default to Portuguese', () => {
    cy.get('html').should('have.attr', 'lang', 'pt');
  });

  it('should switch to English', () => {
    cy.getByCy('lang-switcher').click();
    cy.contains('English').click();
    cy.contains(/Ambassador|Embassy/i).should('be.visible');
  });

  it('should switch to German', () => {
    cy.getByCy('lang-switcher').click();
    cy.contains('Deutsch').click();
    cy.contains(/Botschaft|Konsular/i).should('be.visible');
  });

  it('should persist language on navigation', () => {
    cy.getByCy('lang-switcher').click();
    cy.contains('English').click();
    cy.contains('Events').click();
    cy.url().should('include', '/eventos');
    // Content should still be in English
    cy.get('html').should('have.attr', 'lang', 'en');
  });
});
