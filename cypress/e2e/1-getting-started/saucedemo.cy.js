/// <reference types="cypress" />

describe('example sauce demo app', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it.only('standard login and checkout flow', () => {
    // Add to cart
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Go to cart
    cy.get('.shopping_cart_link').click();

    // check cart items
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('Sauce Labs Bike Light').should('exist');
    cy.contains('Sauce Labs Backpack').should('exist');

    // Proceed to checkout
    cy.get('[data-test="checkout"]').click();

    // Fill in user info
    cy.get('[data-test="firstName"]').type('Jane');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Finalize checkout
    cy.get('[data-test="finish"]').click();

    // Verify order completion
    cy.contains('Thank you for your order!').should('be.visible');
  });
});
