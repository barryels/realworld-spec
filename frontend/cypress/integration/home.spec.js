function getURL(path) {
  if (!path) {
    return Cypress.env('host') + '/';
  }
  return Cypress.env('host') + '/' + Cypress.env('path_prefix') + '' + path;
}

describe('Homepage', function () {
  it('should have the correct header links', function () {
    cy.visit(getURL());

    cy.get('nav a').as('navigationAnchors');

    cy.get('@navigationAnchors').eq(0).contains('conduit');
    cy.get('@navigationAnchors').eq(1).contains('Home');
    cy.get('@navigationAnchors').eq(2).contains('Sign in');
    cy.get('@navigationAnchors').eq(3).contains('Sign up');
  });

  it('should navigate to the main pages', function () {
    cy.visit(getURL());

    cy.get('nav a').contains('Sign in').click();
    cy.url().should('include', '/login');

    cy.get('nav a').contains('Sign up').click();
    cy.url().should('include', '/register');

    cy.get('nav a').contains('Home').click();
    cy.url().should('include', '/');

    cy.get('nav a').contains('conduit').click();
    cy.url().should('include', '/');
  });

  it('login form', () => {
    cy.visit(getURL('/login'));

    cy.get('input[placeholder="Email"]')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.get('input[placeholder="Password"]')
      .type('password')
      .should('have.value', 'password');
  });
});
