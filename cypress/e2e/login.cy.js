describe('Login Page', () => {
  const VALID_USERNAME = 'standard_user';
  const VALID_PASSWORD = 'secret_sauce';

  beforeEach(() => {
    cy.visit('/');
  });

  it('should login user with valid credentials', () => {
    cy.login(VALID_USERNAME, VALID_PASSWORD);
    cy.url().should('be.equal', 'https://www.saucedemo.com/inventory.html')
  });

  it('should display error for blocked user', () => {
    const BLOCKED_USERNAME = 'locked_out_user';

    cy.login(BLOCKED_USERNAME, VALID_PASSWORD);
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('should display error for wrong username', () => {
    const WRONG_USERNAME = 'wrong_username';

    cy.login(WRONG_USERNAME, VALID_PASSWORD);
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('should display error for wrong password', () => {
    const WRONG_PASSWORD = 'wrong_password';

    cy.login(VALID_USERNAME, WRONG_PASSWORD);
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('should display error when user tries to access inventory page without logging in', () => {
    cy.visit('/?/inventory.html', { failOnStatusCode: false });

    cy.location("pathname").should("equal", "/");
    cy.get('[data-test="error"]').should('have.text', `Epic sadface: You can only access '/inventory.html' when you are logged in.`);
  });
});
