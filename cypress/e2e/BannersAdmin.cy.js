import uploadFile from "cypress-upload-file";

describe('Banners Tab', () => {
    beforeEach('Login', () => {
        cy.session('Banners session', () => {
            cy.visit('/');
            cy.get('[type="text"]').type('mhadi@example.com');
            cy.get('[type="password"]').type('Themhadi666');
            cy.get('#login-button').click();
            cy.wait(5000);
        });

        cy.visit('/');
        cy.get('a.ant-menu-item-icon[href="/banners"]', { timeout: 100000 }).click();
    });

    it('Uploading Banners', () => { 
        const fileName = "aqua.jpg";

        cy.get('[name="name"]').type('testbanner');
        cy.get('[name="sequence"]').clear().type('0');
        cy.get('input[type="file"]').attachFile(fileName);
        cy.wait(2000); // Consider using a more specific wait if possible
        cy.get('[type="button"]').contains('Submit').click();

        // Assert success notification
        cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 })
            .should('have.text', 'Success');
    });

    it('Deleting Banner', () => {
        cy.get('[class="ant-table-tbody"]', { timeout: 100000 }).contains('testbanner').click();

        // Assert banner is visible
        cy.get('.ant-col-xs-18 > img').should('be.visible').and('exist');

        // Click the delete button
        cy.get('[data-icon="close-circle"]').eq(0).click();
        cy.get('[type="button"]').contains('Yes').click();

        // Assert delete notification
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 })
            .should('have.text', 'Success');
    });
});
