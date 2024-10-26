describe('Customer Tab', () => {
  let createdVehicleId;

  // Custom command for logging in
  Cypress.Commands.add('login', (email, password) => {
    cy.visit('/');
    cy.get('#email-address-input').type(email);
    cy.get('#password-input').type(password);
    cy.get('#login-button').click();
    cy.wait(10000); // Consider replacing with a better wait strategy if possible
  });

  beforeEach('Logging In', () => {
    cy.fixture('login.json').then((loginData) => {
      cy.session('customer session', () => {
        cy.login(loginData.email, loginData.password);
      }, {
        cacheAcrossSpecs: true,
      });
    });

    cy.visit('/');
    cy.get('a.ant-menu-item-icon[href="/customers"]', { timeout: 10000 }).click();
  });

  it('Searching for Customer', () => {
    // Entering contact number to search
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();

    // Assert the customer is displayed
    cy.get('[class="ant-table-cell"]', { timeout: 20000 })
      .should('contain.text', 'Test Customer')
      .and('be.visible');

    cy.get('[class="ant-table-cell"]')
      .should('contain.text', '+923000000000');
  });

  it('Updating Customer', () => {
    // Entering contact number to search
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();

    // Assert the customer is displayed and open the details
    cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 20000 })
      .should('contain.text', 'Test Customer')
      .click();

    cy.get('[class="name-container"]').should('have.text', 'Test Customer');
    cy.get('#edit-customer-button').click();

    // Update customer details
    cy.get('[name="fullName"]').clear().type('Test');
    cy.get('[type="button"]').contains('Update').click();

    // Assert success message
    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessUser Updated Successfully!");
    cy.get('.ant-drawer-close').click();
    cy.get('[class="name-container"]').should('have.text', 'Test');

    // Reset to default
    cy.get('#edit-customer-button').click();
    cy.get('[name="fullName"]').clear().type('Test Customer');
    cy.get('[type="button"]').contains('Update').click();
    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessUser Updated Successfully!");
  });

  it('Adding new vehicle for customer', () => {
    cy.intercept('POST', '/api/uservehiclemaps/register').as('CustomerVehicleRequest');

    // Searching for the customer
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();
    cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 50000 }).should('contain.text', 'Test Customer').click();

    // Adding new vehicle
    cy.get('[type="button"]').contains('New Vehicle', { timeout: 10000 }).click();
    cy.get('#rc_select_0').type('Corolla');
    cy.get('.ant-select-item-option-content').filter(':contains("Corolla")').eq(2).click();
    
    cy.get('[name="year"]').type('2013');
    cy.get('[class="ant-form-item-control-input"]').eq(2).type('10TH GEN XLI');
    cy.get('[title="10TH GEN XLI"]').click();
    
    cy.get('[name="registrationNo"]').type('t3st-r3g');
    cy.get('[name="mileage"]').type('12345');
    cy.get('[type="button"]').contains('Create').click();

    // Assert success notification
    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessVehicle Successfully Registered");
    cy.wait('@CustomerVehicleRequest', { timeout: 40000 }).then((interception) => {
      createdVehicleId = interception.response.body.result._id;
      cy.log('Created Vehicle ID:', createdVehicleId);
    });
  });

  it('Deleting Vehicle', () => {
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();
    cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 50000 }).should('contain.text', 'Test Customer').click();

    cy.get('.rc-virtual-list-scrollbar-vertical > .rc-virtual-list-scrollbar-thumb').scrollTo('bottom');
    cy.get(`[data-row-key="${createdVehicleId}"]`).contains('Edit').click();
    cy.get('[data-icon="delete"]').click();
    cy.get('[type="button"]').contains('Yes').click();

    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessVehicle Deleted");
  });
});
