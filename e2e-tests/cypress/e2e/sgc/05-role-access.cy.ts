describe('SGC Role-Based Access Control', () => {
  it('should allow ADMIN to access workflow-admin', () => {
    cy.login('admin');
    cy.visitSGC('/workflow-admin');
    cy.url().should('include', '/workflow-admin');
  });

  it('should allow ADMIN to access user-admin', () => {
    cy.login('admin');
    cy.visitSGC('/user-admin');
    cy.url().should('include', '/user-admin');
  });

  it('should allow ADMIN to access reports', () => {
    cy.login('admin');
    cy.visitSGC('/relatorios');
    cy.url().should('include', '/relatorios');
  });

  it('should redirect VIEWER from workflow-admin to unauthorized', () => {
    cy.login('viewer');
    cy.visitSGC('/workflow-admin');
    cy.url().should('include', '/unauthorized');
  });

  it('should redirect OFFICER from user-admin to unauthorized', () => {
    cy.login('officer');
    cy.visitSGC('/user-admin');
    cy.url().should('include', '/unauthorized');
  });

  it('should allow VIEWER to read citizens', () => {
    cy.login('viewer');
    cy.visitSGC('/cidadaos');
    cy.get('table, mat-table').should('be.visible');
  });

  it('should hide create button for VIEWER', () => {
    cy.login('viewer');
    cy.visitSGC('/cidadaos');
    cy.getByCy('btn-new-cidadao').should('not.exist');
  });
});
