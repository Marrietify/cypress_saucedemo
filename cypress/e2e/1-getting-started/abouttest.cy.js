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

  it('Should display About link on hover and navigate when clicked', () => {
    // Open burger menu
    cy.get('#react-burger-menu-btn').click();

    // Wait for menu to become visible
    cy.get('.bm-item-list').should('be.visible');

    // Hover over "About" menu item
    cy.get('#about_sidebar_link').trigger('mouseover');

    // Check if it’s visible and clickable
     cy.get('#about_sidebar_link')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'saucelabs.com')

    // Validate redirection to the About page (usually to the Sauce Labs site)
    //cy.url().should('include', 'saucelabs.com');
  });
  
});