describe('Login Page Test', function () {
  const loginData = {
    email: 'hadi.imran@example.com',
    password: '@Qwerty123',
  };

  // Custom command for logging in
  Cypress.Commands.add('postTokenLogin', () => {
    cy.intercept('POST', 'https://test.autocore.io/api/users/login').as('loginRequest');

    cy.visit('/');
    cy.get('#email-address-input').type(loginData.email);
    cy.get('#password-input').type(loginData.password);
    cy.get('#login-button').click();

    // Wait for the login request to complete
    cy.wait('@loginRequest').then((interception) => {
      const response = interception.response;
      expect(response.body).to.have.property('firstName');
      expect(response.body.token).to.have.property('authorization');
      cy.setLocalStorage('token', response.body.token.authorization);
    });
  });

  describe('HTTP Example', () => {
    beforeEach(() => {
      // Ensure a fresh session for each test
      cy.session('customer session', () => {
        cy.postTokenLogin();
      });
      cy.restoreLocalStorage();
    });

    it('GET List', () => {
      // Get token from local storage
      cy.getLocalStorage('token').then((token) => {
        cy.request({
          method: 'GET',
          url: 'https://test.autocore.io/api/users/getall',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.body).to.have.property('firstName');
          expect(response.body).to.have.property('lastname');
        });
      });
    });
  });
});
