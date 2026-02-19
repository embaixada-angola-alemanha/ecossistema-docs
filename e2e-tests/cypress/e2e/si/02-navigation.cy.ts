describe('SI Public Navigation', () => {
  it('should navigate to Ambassador page', () => {
    cy.visitSI('/');
    cy.contains('Embaixador').click();
    cy.url().should('include', '/embaixador');
    cy.get('h1, h2').should('be.visible');
  });

  it('should navigate to About Angola page', () => {
    cy.visitSI('/sobre-angola');
    cy.url().should('include', '/sobre-angola');
  });

  it('should navigate to Bilateral Relations', () => {
    cy.visitSI('/relacoes-bilaterais');
    cy.url().should('include', '/relacoes-bilaterais');
  });

  it('should navigate to Consular Sector', () => {
    cy.visitSI('/sector-consular');
    cy.url().should('include', '/sector-consular');
    cy.get('h1, h2').should('be.visible');
  });

  it('should navigate to Events page', () => {
    cy.visitSI('/eventos');
    cy.url().should('include', '/eventos');
  });

  it('should navigate to Contacts page', () => {
    cy.visitSI('/contactos');
    cy.url().should('include', '/contactos');
  });

  it('should show 404 page for unknown routes', () => {
    cy.visitSI('/pagina-inexistente');
    cy.contains(/não encontrad|not found|404/i).should('be.visible');
  });
});
