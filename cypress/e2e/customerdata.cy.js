/// <reference types="cypress" />

describe('Sidebar Menu - About Link Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Ensure we're on the inventory page
    cy.url().should('include', '/inventory.html');
  });
});