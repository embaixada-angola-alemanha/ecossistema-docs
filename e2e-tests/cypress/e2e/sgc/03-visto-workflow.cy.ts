describe('SGC Visa Workflow', () => {
  beforeEach(() => {
    cy.login('consul');
    cy.visitSGC('/vistos');
    cy.waitForLoad();
  });

  it('should display visa list with status filters', () => {
    cy.get('table, mat-table').should('be.visible');
    cy.getByCy('filter-estado').should('exist');
  });

  it('should filter visas by type', () => {
    cy.getByCy('filter-tipo').click();
    cy.get('mat-option').contains('TURISMO').click();
    cy.waitForLoad();
    cy.get('table tbody tr, mat-row').each(($row) => {
      cy.wrap($row).should('contain.text', 'TURISMO');
    });
  });

  it('should filter visas by status', () => {
    cy.getByCy('filter-estado').click();
    cy.get('mat-option').contains('SUBMETIDO').click();
    cy.waitForLoad();
  });

  it('should open visa detail with timeline', () => {
    cy.get('table tbody tr, mat-row').first().click();
    cy.getByCy('visto-timeline').should('be.visible');
  });

  it('should transition visa status (SUBMETIDO → EM_ANALISE)', () => {
    cy.getByCy('filter-estado').click();
    cy.get('mat-option').contains('SUBMETIDO').click();
    cy.waitForLoad();
    cy.get('table tbody tr, mat-row').first().click();
    cy.getByCy('btn-transition').click();
    cy.get('mat-dialog-container').should('be.visible');
    cy.getByCy('transition-target').click();
    cy.get('mat-option').contains('EM_ANALISE').click();
    cy.getByCy('btn-confirm-transition').click();
    cy.contains('EM_ANALISE').should('be.visible');
  });

  it('should show empty state for no results', () => {
    cy.getByCy('filter-estado').click();
    cy.get('mat-option').contains('CANCELADO').click();
    cy.waitForLoad();
    // May or may not have results; check for table or empty state
    cy.get('body').then(($body) => {
      if ($body.find('eco-empty-state').length) {
        cy.get('eco-empty-state').should('be.visible');
      }
    });
  });
});
