/// <reference types="cypress" />

describe('example sauce demo app', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });
// Test 1: Inventory
  it.only("should display inventory container with all inventory items", () => {
    // Assert inventory container exists and is visible
    cy.get("#inventory_container")
      .should("exist")
      .and("be.visible");

    // Assert inventory list exists
    cy.get(".inventory_list")
      .should("exist")
      .and("be.visible");

    // Assert that there are at least 6 items (index 5 exists)
    cy.get(".inventory_item")
      .should("have.length.at.least", 6);

    // Use .within() instead of cy.wrap()
    cy.get(".inventory_item").each(($el) => {
      cy.wrap($el).within(() => {
        cy.get(".inventory_item_name").should("exist").and("be.visible");
        cy.get(".inventory_item_img").should("exist").and("be.visible");
        cy.get(".inventory_item_price").should("exist").and("be.visible");
      });
    });
  });
  // Test Case 2:  Second Product
  it('should add only the second product to cart and validate in cart', () => {
    // Get the second product on the list, Index 1
    cy.get('.inventory_item').eq(1).as('secondProduct');

    // Add the second product to the cart
    cy.get('@secondProduct')
      .find('button')
      .contains('Add to cart')
      .click();

    // Navigate to the shopping cart
    cy.get('.shopping_cart_link').click();

    // Validate that the cart has exactly 1 product
    cy.get('.cart_item').should('have.length', 1);

    // Get the stored product name and check if it's in the cart
    cy.get('@secondProductName').then((productName) => {
      cy.get('.inventory_item_name').should('contain.text', productName);
    });

    // Proceed with checkout
    cy.get('[data-test="checkout"]').click();

    // Fill out the checkout form
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Verify that the overview page is displayed
    cy.url().should('include', '/checkout-step-two');
    cy.contains('Checkout: Overview').should('be.visible');

    // Complete the checkout
    cy.get('[data-test="finish"]').click();

    // Verify that the "Thank you for your order!" message appears
    cy.contains('Thank you for your order!').should('be.visible');
  });
  
  // Test Case 2: Validate Product Removal from Cart
  it('should remove a product from the cart and update the cart count', () => {
    // Add the first product to the cart
    cy.get('.inventory_item').eq(0).find('button').contains('Add to cart').click();

    // Add the second product to the cart
    cy.get('.inventory_item').eq(1).find('button').contains('Add to cart').click();

    // Navigate to the shopping cart
    cy.get('.shopping_cart_link').click();

    // Assert that the cart contains 2 items
    cy.get('.cart_item').should('have.length', 2);

    // Remove the first product from the cart
    cy.get('.cart_item').eq(0).find('.cart_button').contains('Remove').click();

    // Assert that the cart now contains only 1 item
    cy.get('.cart_item').should('have.length', 1);

    // Optionally, verify that the correct product was removed
    cy.get('.cart_item').eq(0).find('.inventory_item_name')
      .should('contain.text', 'Sauce Labs Bike Light'); 
      // Verify the remaining product in cart
  });
  // Test Case 3: Validate Navigation and Product Details Page
  it('should navigate to the product details page and display correct product info', () => {
    // Click on the first product to view details
    cy.get('.inventory_item').eq(0).click();

    // Assert that the product details page is displayed
    cy.url().should('include', '/inventory-item');

    // Verify the product name, image, and price match the selected product
    cy.get('.inventory_details_name')
      .should('contain.text', 'Sauce Labs Backpack'); // Verify product name

    cy.get('.inventory_details_img')
      .should('have.attr', 'src') // Ensure the image is loaded
      .and('include', 'sauce-labs-backpack.jpg'); // Check that the image source contains the product image

    cy.get('.inventory_details_price')
      .should('contain.text', '$29.99'); // Verify product price
  });
});