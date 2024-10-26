describe('Users Tab', () => {


    before('Logging In', () => {

        cy.fixture('login.json').then((loginData) => {
            cy.session('my-session', () => {
              cy.visit('/');
              cy.get('[type="text"]').type(loginData.email);
              cy.get('[type="password"]').type(loginData.password);
              cy.get('#login-button').click();
              cy.wait(10000);
            }, {
                cacheAcrossSpecs: true
              });                
        })         
    })
    it('Adding User', () => {
        cy.visit('/');
        //   cy.get('.ant-btn').click();
        cy.get('a.ant-menu-item-icon[href="/users"]', { timeout: 100000 }).click();

        cy.get('[type="button"]').contains('Add Member').click();

        cy.get('[name="fullName"]').type('Test User');
        cy.get('[class="ant-select-selection-search"]').eq(0).click({ force: true });
        cy.get('.rc-virtual-list').contains('Services Admin').click();
        cy.get('[name="contact"]').type('3000000000');
        cy.get('[name="email"]').type('cypress@test.com');
        cy.get('[name="password"]').type('qwerty');
        cy.get('[name="confirmPassword"]').type('qwerty');
        //  cy.get('.ant-select-selector').eq(3).click();
        cy.get('[role="tab"]').contains('Work Hours').click();


        function AddTime(eq) {

            // cy.get('[class="ant-select-selector"]').eq(eq)
            //     .click({ force: true })


            // cy.get('.ant-select-dropdown.ant-select-dropdown-placement-bottomLeft.ant-select-dropdown-hidden', { timeout: 10000 })
            //     .invoke('attr', 'style', 'display: block !important')
            //     .get('.ant-select-item-option-content', { timeout: 10000 })
            //     .contains('09 AM').invoke('css', 'width', '22px').invoke('css', 'visibility', 'visible')
            //     .invoke('css', 'height', 'auto')
            //     .click();

            // cy.get('.ant-select-dropdown.ant-select-dropdown-placement-bottomLeft.ant-select-dropdown-hidden').invoke('css', 'display').then((displayValue) => {
            //     cy.log('Display property:', displayValue);
            // });

            // cy.get('.ant-select-item-option-content', { timeout: 10000 })
            //     .then(($element) => {
            //         if ($element.length === 0) {
            //             cy.log('Element not found.');
            //         } else {
            //             const width = $element.css('width');
            //             const height = $element.css('height');
            //             cy.log('Element width:', width);
            //             cy.log('Element height:', height);
            //         }
            //     })


        // cy.get('.ant-select-dropdown.ant-select-dropdown-placement-bottomLeft.ant-select-dropdown-hidden', {force: true})
        
        // cy.get('[title="09 AM"]')
        // .click();
        cy.get('[class="ant-select-selector"]').eq(eq).click();
        cy.wait(3000);}
        
        

        //function sirf aik bar chalra
        AddTime(3);
        cy
        //.get('[class="ant-select-item-option-content"]', { timeout: 20000 })
        .contains('09 AM').click(); 
        AddTime(5);
        // AddTime(7);
        // AddTime(9);
        // AddTime(11);
        // AddTime(13);
        // AddTime(15);


    
    });


})