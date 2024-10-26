describe('Services Tab', () => {
    const randomCode = 'Test Task _' + Math.random().toString(36).substring(2, 6);
    let createdObjectId;
    let createdServiceId;

    beforeEach('Session', () => {
        cy.session('service session', () => {
            cy.visit('/');
            cy.get('[type="text"]').type('mhadi@example.com');
            cy.get('[type="password"]').type('Themhadi666');
            cy.get('#login-button').click();
            cy.wait(10000);
            cy.getCookies().then((cookies) => {
                cy.log('Cookies:', cookies);
            });
        });

        cy.visit('/');
        cy.get('a.ant-menu-item-icon[href="/services"]', { timeout: 100000 }).click();
    });

    it('Adding Option', () => {
        cy.get('[placeholder="Enter Service Name"]').eq(0).type('Test Option');
        cy.get('[type="button"]').contains('Submit').eq(0).click();
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
    });

    it('Adding Task', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/detailservices/register',
        }).as('updateRequest');

        cy.get('[placeholder="Enter Service Name"]').eq(1).type(randomCode);
        cy.get('[class="ant-select-selection-overflow"]').type('Test');
        cy.get('.ant-select-item-option-content').contains('Test Option').click();
        cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-form > [style="margin-left: -2px; margin-right: -2px;"] > .ant-col-xs-24 > .form-button-container > .general-btn').click({ force: true });

        cy.wait('@updateRequest', { timeout: 40000 }).then((interception) => {
            createdObjectId = interception.response.body.result._id;
            cy.log('Created Object ID:', createdObjectId);
        });

        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
    });

    it('Adding Service', () => {
        const fileName = "parts.jpg";

        cy.intercept({
            method: 'POST',
            url: '/api/services/register',
        }).as('ServicesUpdateRequest');

        cy.get('[placeholder="Enter Service Name"]').eq(2).type('Test Service');
        cy.get('input[type="file"]').eq(1).attachFile(fileName);
        cy.get('[style="margin-left: -2px; margin-right: -2px;"] > .form-button-container > .general-btn').click();

        cy.wait('@ServicesUpdateRequest', { timeout: 40000 }).then((interception) => {
            createdServiceId = interception.response.body.result._id;
            cy.log('Created Service ID:', createdServiceId);
        });

        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
    });

    it('Deleting Option', () => {
        cy.get('[class="ant-table-row ant-table-row-level-0"]').eq(25).within(() => {
            cy.get('[class="anticon anticon-delete"]').click();
        });

        cy.get('[type="button"]').contains('Yes').click();
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
    });

    it('Deleting Service', () => {
        cy.get(`[data-row-key="${createdServiceId}"] > :nth-child(2)`, { timeout: 10000 }).click();
        cy.get('[type="button"]').contains('Yes').click();
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
    });
});
