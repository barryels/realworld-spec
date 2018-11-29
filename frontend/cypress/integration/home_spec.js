let domain,
  separator;

domain = 'https://demo.realworld.io/';
separator = '#';

domain = 'http://localhost:3000/';
separator = '?';

function getURL(path) {
  if (!path) {
    return domain;
  }
  return domain + '' + separator + '' + path;
}

describe('Homepage', function () {
  it('should have the correct header links', function () {
    cy.visit(getURL());

    cy.get('nav a').eq(0).contains('conduit');
    cy.get('nav a').eq(1).contains('Home');
    cy.get('nav a').eq(2).contains('Sign in');
    cy.get('nav a').eq(3).contains('Sign up');
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
