import './commands';

// Prevent Cypress from failing on uncaught exceptions from the app
Cypress.on('uncaught:exception', () => false);
