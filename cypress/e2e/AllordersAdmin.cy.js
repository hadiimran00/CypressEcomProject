describe('All Orders Tab', () => {
    before('Login', () => {
        cy.session('my-session', () => {
            cy.LoginAndNav('asjad@example.com', 'Theasjad666', 'All Orders');
        });
    });

    it('Status Filter', () => {
        cy.visit('/');

        // Intercepting API calls to mock responses
        cy.intercept('GET', 'https://test.example.com/api/orders/get/from/*/*', { fixture: 'orders' }).as('allorders');
        cy.intercept('GET', 'https://test.example.com/api/orders/get/active', { fixture: 'orders' }).as('activeorders');

        // Date selection
        cy.get('[placeholder="Select date"]').eq(0).click();
        cy.wait('@activeorders', { timeout: 200000 });
        cy.wait('@allorders', { timeout: 100000 });

        cy.get('[title="2023-10-11"] > .ant-picker-cell-inner').click();

        // Toggle filters
        const filterOptions = ['By Create Date', 'By App. Date', 'By Complete Date', 'Strict Mode'];
        filterOptions.forEach(option => {
            cy.get('.ant-checkbox-wrapper').contains(option).click();
        });

        // Status filter function
        function StatusFilter(StatusName) {
            cy.get('[class="anticon anticon-filter"]').click();
            cy.get('[class="ant-checkbox-wrapper"]').contains(StatusName).click();
            cy.get('[class="ant-btn general-btn my-general-btn"]').click();
            cy.get('.virtual-table-cell').contains(StatusName).should('be.visible').and('have.text', StatusName);
        }

        const StatusesName = [
            'Inquiry', 'Services Confirmed', 'QC', 'Quotation Approved',
            'Invoice Requested', 'Invoice Sent', 'Ready For Quotation',
            'Ready For Dispatch', 'Customer Confirmed', 'Parts Rate Confirmed',
            'Job In Progress'
        ];

        // Apply each status filter
        StatusesName.forEach(StatusName => {
            StatusFilter(StatusName);
        });
    });

    it('Date Range Filter', () => {
        cy.visit('/');

        // Define date range
        const fromDate = new Date('2023-10-10').getTime();
        const toDate = new Date('2023-10-05').getTime();

        // Date selection
        cy.get('[style="margin-left: 8px;"] > .ant-picker-input > input').click();
        cy.get('.ant-picker-focused > .ant-picker-input > input').clear().type('2023-10-05{enter}');
        cy.get('[style="margin-right: 8px;"] > .ant-picker-input > input').click();
        cy.get('.ant-picker-focused > .ant-picker-input > input').clear().type('2023-10-10{enter}');
        cy.get('[style="display: flex; flex-direction: row;"] > .ant-btn').click();

        // Intercept date range API call
        cy.intercept('GET', `https://test.example.com/api/orders/get/from/${fromDate}/${toDate}`).as('5-10octOrders');

        // Validate response
        cy.wait('@5-10octOrders', { timeout: 100000 }).then(interception => {
            const result = interception.response.body.result;
            result.forEach(element => {
                expect(element.createdOn).to.be.within(fromDate, toDate);
            });
        });

        cy.get(':nth-child(3) > .ant-btn').click({ timeout: 50000 });
    });

    it('Filter By Date (App Date, Create Date, By Complete Date)', () => {
        cy.visit('/');

        cy.intercept('GET', 'https://test.example.com/api/orders/get/from/*/*', { fixture: 'orders' }).as('allorders');

        cy.get(':nth-child(3) > .ant-picker > .ant-picker-input > input').clear({ force: true }).type('2023-10-05{enter}');
        cy.wait('@allorders', { timeout: 100000 });

        // Assert date visibility
        cy.get('.virtual-table-cell').contains('Oct 5 2023 12:30 PM').should('be.visible').and('have.text', 'Oct 5 2023 12:30 PM');

        function dateFilter() {
            cy.get('.virtual-table-cell').should('have.length', 9).and('be.visible');
            cy.get('[style="position: absolute; left: 0px; top: 0px; height: 68px; width: 130px;"]').should('have.text', '2023-36136');
        }

        // Toggle date filters
        const dateOptions = ['By App. Date', 'By Create Date', 'By Complete Date'];
        dateOptions.forEach(option => {
            cy.get('.ant-checkbox-wrapper').contains(option).click();
            dateFilter();
            cy.get('.ant-checkbox-wrapper').contains(option).click();
        });
    });
});
