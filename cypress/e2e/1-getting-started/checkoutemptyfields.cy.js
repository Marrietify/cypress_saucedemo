/// <reference types="cypress" />

describe('Checkout Form Validation', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('.inventory_item').eq(0).within(() => {
      cy.get('button').contains('Add to cart').click();
    });

    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
  });

  it('should show error when required fields are empty', () => {
    // Submit without filling fields
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'First Name is required');

    // Fill first name only
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Last Name is required');

    // Fill last name only
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Postal Code is required');
  });
});