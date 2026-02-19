describe('SI Public Homepage', () => {
  beforeEach(() => {
    cy.visitSI('/');
  });

  it('should display homepage with hero section', () => {
    cy.get('h1, .hero-title').should('be.visible');
  });

  it('should display navigation menu', () => {
    cy.get('nav, mat-toolbar').should('be.visible');
  });

  it('should have links to main sections', () => {
    cy.contains('Embaixador').should('be.visible');
    cy.contains('Sobre Angola').should('be.visible');
    cy.contains('Sector Consular').should('be.visible');
    cy.contains('Eventos').should('be.visible');
    cy.contains('Contactos').should('be.visible');
  });

  it('should have language switcher', () => {
    cy.getByCy('lang-switcher').should('exist');
  });

  it('should display footer with embassy info', () => {
    cy.get('footer').scrollIntoView().should('be.visible');
  });
});
