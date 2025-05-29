/// <reference types="cypress" />

describe('example sauce demo app', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('should login successfully with correct username and password', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Successful login should redirect to /inventory.html
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
  });

  it('should show error on login with incorrect username', () => {
    cy.get('#user-name').type('wrong_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');
  });

  it('should show error on login with incorrect password', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('wrong_password');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');
  });

  it('should show error when username is missing', () => {
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('should show error when password is missing', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('should clear error message after clicking close button', () => {
    cy.get('#login-button').click(); // Empty fields trigger error

    cy.get('[data-test="error"]').should('be.visible');
    cy.get('.error-button').click();
    cy.get('[data-test="error"]').should('not.exist');
  });
});
