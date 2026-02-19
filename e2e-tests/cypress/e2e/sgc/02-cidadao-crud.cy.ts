describe('SGC Citizen Management', () => {
  beforeEach(() => {
    cy.login('admin');
    cy.visitSGC('/cidadaos');
    cy.waitForLoad();
  });

  it('should display citizen list with pagination', () => {
    cy.get('table, mat-table').should('be.visible');
    cy.get('mat-paginator').should('exist');
  });

  it('should search citizens by name', () => {
    cy.getByCy('search-input').type('João');
    cy.get('table tbody tr, mat-row').should('have.length.greaterThan', 0);
  });

  it('should open citizen creation form', () => {
    cy.getByCy('btn-new-cidadao').click();
    cy.url().should('include', '/cidadaos/novo');
    cy.get('form').should('be.visible');
  });

  it('should validate required fields on creation', () => {
    cy.getByCy('btn-new-cidadao').click();
    cy.getByCy('btn-save').click();
    cy.get('mat-error').should('have.length.greaterThan', 0);
  });

  it('should navigate to citizen detail', () => {
    cy.get('table tbody tr, mat-row').first().click();
    cy.url().should('match', /\/cidadaos\/[a-f0-9-]+/);
  });

  it('should show citizen detail sections', () => {
    cy.get('table tbody tr, mat-row').first().click();
    cy.contains('Dados pessoais').should('be.visible');
    cy.contains('Contacto').should('be.visible');
  });
});
