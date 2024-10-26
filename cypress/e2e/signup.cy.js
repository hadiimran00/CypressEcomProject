describe('SignUp Page', ()=>{

    const randomCode = Math.random().toString(36).substring(1, 7);

    it('Signing up with valid info',()=>{
        cy.visit('/')
        cy.wait(3000);
        cy.get('[id="signup-button"]').click()
        cy.get('[name="fullName"]').type('Test Organization');
        cy.get('[name="firstName"]').type('First Name', {force : true})
        cy.get('[name="lastName"]').type('Last Name', {force : true })
        cy.get('[name="email"]').type(`${randomCode}@email.com`);
        cy.log(`${randomCode}@email.com`)
        console.log(`${randomCode}@email.com`) 

        
        cy.get('[type="search"]').eq(0).type('Pakistan');
        cy.get('[class="rc-virtual-list"]', {timeout: 10000}).eq(0).click();
        cy.get('[type="search"]').eq(1).type('Karachi');
       cy.get('[class="rc-virtual-list"]').contains('Karachi').click();
        cy.get('[name="address"]').type('["Test Address"]');
        cy.get('[name="password"]').type('@Qwerty123');
        cy.get('[name="confirmPassword"]').type('@Qwerty123');
        //  cy.get('[id="login-button"]').click()

        cy.intercept('https://test.example.io/api/users/email/otp').as('OTP')
        cy.wait('@OTP').its('response.statusCode').should('eq', 200);


    })
})