describe('GPJ Gantt & Charts', () => {
  beforeEach(() => {
    cy.login('admin');
  });

  it('should display Gantt chart', () => {
    cy.visitGPJ('/gantt');
    cy.waitForLoad();
    cy.getByCy('gantt-chart').should('be.visible');
  });

  it('should show timeline bars in Gantt', () => {
    cy.visitGPJ('/gantt');
    cy.waitForLoad();
    cy.get('[data-cy="gantt-bar"], .gantt-bar').should('have.length.greaterThan', 0);
  });

  it('should display analytics charts page', () => {
    cy.visitGPJ('/charts');
    cy.waitForLoad();
    cy.getByCy('charts-container').should('be.visible');
  });

  it('should show burndown chart', () => {
    cy.visitGPJ('/charts');
    cy.waitForLoad();
    cy.getByCy('burndown-chart').should('exist');
  });

  it('should show velocity chart', () => {
    cy.visitGPJ('/charts');
    cy.waitForLoad();
    cy.getByCy('velocity-chart').should('exist');
  });
});
