describe('Subscription',()=>{

    beforeEach('Logging In',()=>{
        cy.login();
    })
    it('Subscribing', () => {
        cy.visit('/')
        cy.intercept({
            method: 'GET',

            url: 'https://test.example.io/api/organizations/get/franchise'
        }, {
            fixture: 'unsuborg.json'
        }
        ).as('unsuborg')
        
        cy.get('a.ant-menu-item-icon[href="/settings"]').click();
        cy.wait('@unsuborg').then((interception) => {
            // Access the response body
            const responseBody = interception.response.body;
            console.log(responseBody);
          });



      
    });

})