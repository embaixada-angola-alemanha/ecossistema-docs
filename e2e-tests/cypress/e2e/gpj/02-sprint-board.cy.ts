describe('GPJ Sprint Board', () => {
  beforeEach(() => {
    cy.login('admin');
    cy.visitGPJ('/board');
    cy.waitForLoad();
  });

  it('should display sprint board with columns', () => {
    cy.getByCy('board-column').should('have.length.greaterThan', 0);
  });

  it('should show task cards in columns', () => {
    cy.getByCy('task-card').should('have.length.greaterThan', 0);
  });

  it('should show task details on click', () => {
    cy.getByCy('task-card').first().click();
    cy.get('mat-dialog-container, [data-cy="task-detail"]').should('be.visible');
  });

  it('should display task title and status', () => {
    cy.getByCy('task-card').first().within(() => {
      cy.get('[data-cy="task-title"]').should('be.visible');
      cy.get('[data-cy="task-status"], eco-status-badge').should('exist');
    });
  });

  it('should allow sprint selection', () => {
    cy.getByCy('sprint-selector').should('exist');
  });
});
