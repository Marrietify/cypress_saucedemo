/// <reference types="cypress" />

describe('Product Details Page Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('should navigate to product details and show correct info', () => {
    cy.get('.inventory_item').eq(2).within(() => {
      cy.get('.inventory_item_name').click();
    });

    cy.url().should('include', '/inventory-item');
    cy.get('.inventory_details_name').should('be.visible');
    cy.get('.inventory_details_img').should('be.visible');
    cy.get('.inventory_details_price').should('be.visible');
    cy.get('.inventory_details_desc').should('be.visible');
  });
});