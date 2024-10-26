describe('Groups Tab', () => {

    before('Session', () => {


        cy.session('my-session', () => {
            cy.visit('/');
            cy.get('[type="text"]').type('mhadiimran042@gmail.com');
            cy.get('[type="password"]').type('qwerty');
            cy.get('[type="button"]').click();
        })


    })

    beforeEach('Opening Groups Tab', () => {

        cy.visit('/');
        cy.get('[type="button"]').click();
        cy.get('.custom-menu', { timeout: 40000 }).contains('Groups').click();

    })

    it('Adding Brand', () => {

        cy.get('[name="name"]').eq(0).type('Test Brand');
        cy.get('[class="ant-select-selector"]').eq(0).type('Lubrication');
        cy.get('[class="ant-select-item-option-content"]', { timeout: 20000 }).contains('Lubrication').click();
        cy.get('[class="ant-select-selector"]').eq(0).type('Filters');
        cy.get('[class="ant-select-item-option-content"]').contains('Filters').click();
        cy.get('[type="button"]').eq(1).click({ force: true });
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');

        cy.intercept({
            url: 'https://test.example.com/api/brands/details/*'
        }).as('brandsGETapi')


        cy.get('[data-row-key="65537fba4a0eb454a533602a"]').should('have.text', 'Test Brand');
        cy.get('[data-row-key="65537fba4a0eb454a533602a"]').contains('Test Brand').click();
        cy.intercept({
            url: 'https://test.example.com/api/brands/details/*'
        }).as('brandsGETapi')

        cy.wait('@brandsGETapi', { timeout: 20000 })


    });

    it('Deleting Brand', () => {


        cy.get('[data-icon="search"]').eq(0).click();
        cy.get('[placeholder="Search name"]').type('Test');
        cy.get('[type="button"]').contains('Search').click();
        cy.get('[data-row-key="65537fba4a0eb454a533602a"]', { timeout: 40000 }).should('have.text', 'Test Brand');
        cy.get('[class="anticon anticon-delete"]').eq(0).click();
        cy.get('[type="button"]').contains('Yes').click();
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');





    });


})