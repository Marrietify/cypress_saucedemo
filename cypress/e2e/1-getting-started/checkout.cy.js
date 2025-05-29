/// <reference types="cypress" />

describe('Checkout Flow Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('should complete a successful checkout for a product', () => {
    // Add first product
    cy.get('.inventory_item').eq(0).within(() => {
      cy.get('button').contains('Add to cart').click();
    });

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);

    // Checkout
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Finalize Order
    cy.get('[data-test="finish"]').click();
    cy.contains('Thank you for your order!').should('be.visible');
  });
});