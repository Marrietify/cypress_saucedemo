/// <reference types="cypress" />

describe('Product Details Page Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('should navigate to product details page and validate content', () => {
    // Click the first product item
    cy.get('.inventory_item').first().within(() => {
      cy.get('.inventory_item_name').click();
    });

    // URL should contain '/inventory-item'
    cy.url().should('include', '/inventory-item');

    // Validate product details
    cy.get('.inventory_details_name').should('be.visible').and('not.be.empty');
    cy.get('.inventory_details_price').should('be.visible').and('contain.text', '$');

    // Check for a generic 'Add to cart' button
    cy.get('[data-test^="add-to-cart"]').should('be.visible');
  });
});
