describe('Parts Tab', () => {
  beforeEach('Logging In', () => {
    cy.fixture('login').then((loginData) => {
      cy.session('inventory session', () => {
        cy.visit('/');
        cy.get('#email-address-input').type(loginData.email);
        cy.get('#password-input').type(loginData.password);
        cy.get('#login-button').click();
        cy.wait(10000); // Consider replacing this with a more robust wait strategy
      });
    });

    cy.visit('/');
    cy.get('a.ant-menu-item-icon[href="/inventory"]', { timeout: 10000 }).click();
  });

  it('Adding Parts', () => {
    const fileName = "parts.jpg";

    cy.get('[type="button"]').contains('Add Parts').click();
    cy.get('[class="ant-select-selection-item"]').eq(0).type('Test');
    cy.get('[class="ant-select-item-option-content"]', { timeout: 50000 }).contains('Test Brand').click();
    cy.get('[class="ant-select-selection-item"]').eq(1).type('Lubrication');
    cy.get('[class="ant-select-item-option-content"]', { timeout: 20000 }).contains('Lubrication & Hydraulics').click();
    cy.get('[class="ant-select-selection-item"]').eq(2).type('Engine Oil');
    cy.get('[class="ant-select-item-option-content"]', { timeout: 20000 }).contains('Engine Oil').click();
    
    cy.get('[name="partNo"]').type('qwerty-111');
    cy.get('[name="costPrice"]').type('999');
    cy.get('[name="priceMargin"]').type('10');
    cy.get('[name="volume"]').type('4');
    cy.get('input[type="file"]').attachFile(fileName);
    cy.get('[type="search"]').eq(3).type('0W-20');
    cy.get('[class="ant-select-item-option-content"]').contains('0W-20').click(); // Ensure to click the option

    cy.get('[type="button"]').contains('Submit').click();
    cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 }).should('have.text', 'Success');
  });

  it('Deleting Parts', () => {
    cy.get('[class="rc-virtual-list-holder"]', { timeout: 20000 }).should('be.visible');

    cy.get('[data-icon="search"]').eq(2).click();
    cy.get('.ant-input').eq(0).type('Test');
    cy.get('[class="ant-space-item"]').contains('Search').click();

    cy.get('.rc-virtual-list-holder-inner > :nth-child(1) > :nth-child(2)', { timeout: 20000 }).should('have.text', 'Test Brand - Engine Oil');

    // Click edit button
    cy.get('[class="ant-typography edit-text css-czsvtd"]').click();
    
    // Click delete button
    cy.get('.west-container > .ant-btn').click();
    cy.get('[type="button"]').contains('Yes').click();

    cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 }).should('have.text', 'Success');
  });
});
