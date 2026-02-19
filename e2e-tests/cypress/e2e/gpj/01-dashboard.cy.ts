describe('GPJ Dashboard', () => {
  beforeEach(() => {
    cy.login('admin');
    cy.visitGPJ('/dashboard');
  });

  it('should display dashboard with project overview', () => {
    cy.get('h1, h2').should('contain.text', 'Dashboard');
  });

  it('should show sprint summary widget', () => {
    cy.getByCy('sprint-summary').should('be.visible');
  });

  it('should show task distribution chart', () => {
    cy.getByCy('task-distribution').should('be.visible');
  });

  it('should show time logged widget', () => {
    cy.getByCy('time-logged').should('exist');
  });

  it('should display progress percentage', () => {
    cy.contains(/%/).should('be.visible');
  });
});
