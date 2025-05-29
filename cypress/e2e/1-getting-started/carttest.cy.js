/// <reference types="cypress" />

describe('Cart Page Tests - Add, Remove, Validate Items', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('should add items to cart and display correct count', () => {
    // Add 2 items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Cart badge should show 2
    cy.get('.shopping_cart_badge').should('contain.text', '2');

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Confirm both items are present
    cy.get('.cart_item').should('have.length', 2);
    cy.get('.inventory_item_name').then($names => {
      const items = [...$names].map(el => el.textContent.trim());
      expect(items).to.include.members(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    });
  });

  it('should remove an item and update the cart count', () => {
    // Add 2 items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('.shopping_cart_link').click();

    // Remove one item
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // One item should remain
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Bike Light');

    // Cart badge should update to 1
    cy.get('.shopping_cart_badge').should('contain.text', '1');
  });

  it('should display correct price and total for items', () => {
    // Add items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('.shopping_cart_link').click();

    // Check individual prices exist
    cy.get('.inventory_item_price').should('have.length', 2);

    // Optional: Parse total price manually if needed (requires checkout page)
  });

  it('should show empty cart badge when all items removed', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('not.exist');
    cy.get('.cart_item').should('have.length', 0);
  });

  it('should navigate back to inventory from cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="continue-shopping"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
  });
});
