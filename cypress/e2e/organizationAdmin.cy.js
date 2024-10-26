describe('Organizations Tab', () => {
    before('Logging In', () => {
        cy.session('customer sessions', () => {
            cy.visit('/');
            cy.fixture('login').then((loginData) => {
                // Assuming you would add code here to log in using loginData
            });
        });
    });

    before('Visit Organizations Tab', () => {
        cy.visit('/');
        cy.get('.custom-menu', { timeout: 40000 }).contains('Organizations').click();
    });

    const addTime = (index) => {
        cy.get('[role="combobox"]').eq(index).click({ force: true });
        cy.get('[class="rc-virtual-list"]')
            .contains('09 AM', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true });
    };

    it('Adding Organization', () => {
        cy.get('[name="fullName"]').type('Test Organization');
        cy.get('[class="ant-select-selector"]').contains('Workshop').click();
        cy.get('[name="contact"]').type('3000000000');
        cy.get('[name="password"]').type('qwerty');
        cy.get('[name="confirmPassword"]').type('qwerty');
        cy.get('[name="address"]').type('Test Address');
        cy.get('[class="ant-select-selection-search"]').eq(1).click({ force: true });
        cy.get('[class="rc-virtual-list"]').contains('Karachi').click();
        cy.get('[name="latitude"]').type('1');
        cy.get('[name="longitude"]').type('1');
        cy.get('[name="cnic"]').type('00000000000000');
        cy.get('[name="ntn"]').type('00000000000000');

        // Add time slots
        const timeSlots = [3, 5, 7, 9, 11, 13, 15];
        timeSlots.forEach(index => addTime(index));
    });

    it('Searching for Organization', () => {
        cy.get('[role="button"]').eq(1).click();
        cy.get('[placeholder="Search fullName"]').type('Test Workshop');
        cy.get('[type="button"]').contains('Search').click();
        cy.get('[class="ant-table-tbody"]').contains(/^Test Workshop$/i, { timeout: 10000 })
            .should('have.text', 'Test Workshop');
    });

    it('Updating Organization', () => {
        cy.get('[role="button"]').eq(1).click();
        cy.get('[placeholder="Search fullName"]').type('Test Workshop');
        cy.get('[type="button"]').contains('Search').click();
        cy.get('[class="ant-table-tbody"]').contains(/^Test Workshop$/i, { timeout: 10000 })
            .should('have.text', 'Test Workshop')
            .click();
        cy.get('[name="fullName"]', { timeout: 10000 }).clear().type('Updated Organization Name');
        cy.get('[type="button"]').contains('Update').click();
    });
});
