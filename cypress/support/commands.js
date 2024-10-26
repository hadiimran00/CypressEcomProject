// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



//import 'cypress-file-upload';


Cypress.Commands.add('LoginAndNav',(email,password,menuitem) => {
    
    cy.visit('https://uat.example.com/');

    // Clear and type the email address
    cy.get('[placeholder="Email"]').clear().type(email);

    // Clear and type the password
    cy.get('[placeholder="Password"]').clear().type(password, { sensitive: true });

    // Click the login button
    cy.get('.ant-btn').click();

    cy.get('.custom-menu', { timeout: 40000 }).contains(menuitem).click();
})

Cypress.Commands.add('login', () => {
  cy.fixture('login').then((loginData) => {
    cy.session('Session', () => {
      cy.visit('/');
      cy.get('#email-address-input').type(loginData.email);
      cy.get('#password-input').type(loginData.password);
      cy.get('#login-button').click();
      cy.wait(5000);
    });
  });
});