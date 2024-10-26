describe('Admin Portal', () => {
  before(() => {
    // Log in to the admin portal and store the session.
    cy.session('my-session', () => {
      cy.visit('/');
      cy.get('[type="text"]').type('mhadiimran042@gmail.com');
      cy.get('[type="password"]').type('qwerty');
      cy.get('[type="button"]').click();
    });
  });

  const statusFlow = (orderStatus) => {
    cy.get('[class="ant-btn general-btn color-white"]')
      .contains(orderStatus)
      .click();
    cy.wait('@registerapi');
    cy.get('.ant-notification-notice-success').should('be.visible');
  };

  const selectService = (selector, serviceName) => {
    cy.get(selector).click();
    cy.get('.rc-virtual-list-holder-inner').contains(serviceName).click({ force: true });
  };

  it('should allow users to place an order successfully', () => {
    cy.visit('/');
    cy.get('[type="button"]').click();

    // Navigate to the Operations section.
    cy.get('.navigation-text').contains('Operations').click();

    // Enter a contact number.
    cy.get('[placeholder="Enter contact number"]').type('300000000');

    // Wait for autosuggest options to load and select the first suggestion.
    cy.get('.react-autosuggest__suggestion', { timeout: 1000000 }).should('be.visible');
    cy.get('.react-autosuggest__suggestion').first().click();

    // Enable a switch and wait.
    cy.get('button[role="switch"]').first().click();
    cy.wait(2000);

    // Select options from dropdowns.
    selectService('#rc_select_12', 'Select Service'); // Update with the correct service name.
    selectService('.ant-select-selector', 'Test Workshop');

    // Submit the order.
    cy.get('[class="ant-btn general-btn my-general-btn"]').contains('Submit Order').click();
    cy.wait(5000);
    
    // Intercept API calls and handle order status updates.
    cy.intercept('https://test.example.com/api/orders/update').as('registerapi');

    // Update order statuses.
    const orderStatuses = [
      'Services Confirmed',
      'Parts Rate Confirmed',
      'Ready For Quotation',
      'Quotation Sent',
      'Guru Dispatched',
      'QC',
      'Request Invoice',
      'Invoice Sent',
      'Payment Collected',
    ];

    orderStatuses.forEach(status => statusFlow(status));

    // Select workshop for services.
    selectService('#rc_select_16', 'Test Workshop');
    selectService('#rc_select_15', 'Test Workshop');

    // Confirm customer and handle address.
    cy.get('.ant-row-space-between > :nth-child(4) > p').click();
    cy.get(':nth-child(2) > [style="width: 80px; border: 1px solid black; display: flex; justify-content: center; align-items: center; font-size: 24px;"]').click();
    
    cy.get('[class="ant-btn general-btn"]').contains('Guru Assigned').click();
    cy.wait('@registerapi');
    cy.get('.ant-notification-notice-success').should('be.visible');

    // Confirm customer and perform final status checks.
    orderStatuses.forEach(status => statusFlow(status));
    cy.get('[class="ant-btn general-btn"]').contains('Payment Collected').click();
    
    cy.get('.ant-tabs-content-holder').should(($element) => {
      const elementText = $element.text();
      statuses.forEach(status => expect(elementText).to.contain(status));
    });

    // Logging order number to delete.
    cy.get('[style="display: flex; flex-direction: column; background-color: white; margin-left: 12px;"] > :nth-child(3) > div > p').then(($element) => {
      const text = $element.text();
      cy.log(`Order No to delete: ${text}`);
    });

    // Final confirmation actions.
    cy.get('[type="button"]').contains('OK').click({ force: true });
    cy.get('[type="button"]').contains('OK').click({ force: true });
  });
});
