describe('Zone/Area Tab',() => {

    let createdObjectId;


    beforeEach('Session', () => {



        cy.session('my-session', () => {
            cy.visit('/');
            cy.get('[type="text"]').type('mhadi@example.com');
            cy.get('[type="password"]').type('Themhadi666');
            cy.get('#login-button').click();
            cy.wait(10000)    
            cy.getCookies().then((cookies) => {
                cy.log('Cookies:', cookies);
            });
        })

        cy.visit('/');
        cy.get('a.ant-menu-item-icon[href="/locations"]', { timeout: 100000 }).click();



    })

    it('Adding Area', () => {


        cy.intercept({
            method: 'POST',
            url: '/api/area/register',
        }).as('updateRequest')

        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');

        cy.get('[name="name"]').eq(1).type('Test Zone');

        cy.get('[class="ant-input css-czsvtd"]').eq(3).type('Test Description',{force: true});

        cy.get('[type="button"]').contains('Submit').eq(1).click();

        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
        cy.wait('@updateRequest', { timeout: 40000 }).then((interception) => {

            createdObjectId = interception.response.body.result._id;
            console.log('Created Object ID:', createdObjectId);
            cy.log(createdObjectId);


            console.log('Intercepted request:', interception.request);
            console.log('Intercepted response:', interception.response);



        });

        
        
    });

    it('Deleting Area', () => {

        

        
        
    });
})