describe('SGC Dashboard', () => {
  beforeEach(() => {
    cy.login('admin');
    cy.visitSGC('/dashboard');
  });

  it('should display dashboard with KPI cards', () => {
    cy.get('h1, h2').should('contain.text', 'Dashboard');
    cy.getByCy('kpi-cards').should('be.visible');
  });

  it('should show citizen count widget', () => {
    cy.getByCy('kpi-cidadaos').should('exist');
  });

  it('should show active processes widget', () => {
    cy.getByCy('kpi-processos').should('exist');
  });

  it('should show recent activity list', () => {
    cy.getByCy('recent-activity').should('be.visible');
  });

  it('should navigate to citizen list from quick action', () => {
    cy.getByCy('quick-action-cidadaos').click();
    cy.url().should('include', '/cidadaos');
  });
});
