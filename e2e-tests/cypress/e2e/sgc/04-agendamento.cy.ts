describe('SGC Appointment Management', () => {
  beforeEach(() => {
    cy.login('officer');
    cy.visitSGC('/agendamentos');
    cy.waitForLoad();
  });

  it('should display appointment list', () => {
    cy.get('table, mat-table').should('be.visible');
  });

  it('should filter by appointment type', () => {
    cy.getByCy('filter-tipo').click();
    cy.get('mat-option').contains('PASSAPORTE').click();
    cy.waitForLoad();
  });

  it('should filter by date range', () => {
    cy.getByCy('filter-data-inicio').type('2026-02-01');
    cy.getByCy('filter-data-fim').type('2026-03-01');
    cy.waitForLoad();
  });

  it('should open appointment creation form', () => {
    cy.getByCy('btn-new-agendamento').click();
    cy.get('form').should('be.visible');
    cy.getByCy('field-tipo').should('exist');
    cy.getByCy('field-dataHora').should('exist');
  });

  it('should view appointment details and history', () => {
    cy.get('table tbody tr, mat-row').first().click();
    cy.getByCy('agendamento-detail').should('be.visible');
    cy.getByCy('agendamento-historico').should('exist');
  });
});
