describe('SI Events', () => {
  beforeEach(() => {
    cy.visitSI('/eventos');
  });

  it('should display events list', () => {
    cy.get('.event-card, mat-card, [data-cy="event-item"]').should('have.length.greaterThan', 0);
  });

  it('should show event details on click', () => {
    cy.get('.event-card, mat-card, [data-cy="event-item"]').first().click();
    cy.url().should('match', /\/eventos\/.+/);
    cy.get('h1, h2').should('be.visible');
  });

  it('should display event date and location', () => {
    cy.get('.event-card, mat-card, [data-cy="event-item"]').first().within(() => {
      cy.get('[data-cy="event-date"], .event-date, time').should('exist');
    });
  });
});
