describe('Inventory Page', () => {
  beforeEach(() => {
    cy.loginCookieInjection();
    cy.visit('/?/inventory.html', { failOnStatusCode: false });
  });

  it('should verify if badge 1 is added to shopping basket after clicking "Add to cart"', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should verify if the "Add to cart" button has changed to "Remove" after clicking it', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.text', 'Remove');
  });

  it('should verify if badge 1 is removed from shopping basket after clicking "Remove" button', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
 