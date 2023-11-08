describe('Login Page', () => {
  beforeEach(function() {
    cy.visit('/');
    cy.fixture('credentials').then(function(testdata){
      this.user = testdata;
    });
  });

  it('should login user with valid credentials', function(){
    cy.login(this.user.validUsername, this.user.validPassword);
    cy.url().should('be.equal', 'https://www.saucedemo.com/inventory.html')
  });

  it('should display error for blocked user', function(){
    cy.login(this.user.blockedUsername, this.user.validPassword);
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('should display error for wrong username', function(){
    cy.login(this.user.wrongUsername, this.user.validPassword);
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('should display error for wrong password', function(){
    cy.login(this.user.validUsername, this.user.wrongPassword);
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('should display error when user tries to access inventory page without logging in', function(){
    cy.visit('/?/inventory.html', { failOnStatusCode: false });

    cy.location("pathname").should("equal", "/");
    cy.get('[data-test="error"]').should('have.text', `Epic sadface: You can only access '/inventory.html' when you are logged in.`);
  });
});
