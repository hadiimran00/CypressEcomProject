describe('Vouchers Tab', () => {

    const currentDate = new Date();

    // Calculate the next date by adding one day
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    // Format the next date as "YYYY/MM/DD"
    const formattedNextDate = nextDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

    console.log(formattedNextDate);

    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    // Format the previous date as "YYYY/MM/DD"
    const formattedPreviousDate = previousDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

    console.log(formattedPreviousDate);

    const randomCode = 'TestVoucher_' + Math.random().toString(36).substring(1, 7);
    console.log(randomCode,"11111")
    const randomCode1 = 'TestVoucher_' + Math.random().toString(36).substring(1, 7);
    console.log(randomCode1,"2222")
    const randomCode2 = 'TestVoucher_' + Math.random().toString(36).substring(1, 7);
    console.log(randomCode2,"333")

    

    beforeEach('Login', () => {
        cy.session('my-session', () => {
            cy.visit('/');
            cy.get('[type="text"]').type('asjad@example.com');
            cy.get('[type="password"]').type('Theasjad666');
            cy.get('#login-button').click();
            cy.wait(10000)  
        });
        cy.visit('/');
        cy.get('a.ant-menu-item-icon[href="/Vouchers"]', { timeout: 100000 }).click();

    });

    // var discount = "50";
    var maxDiscount = "1000";
    function createVoucher(randomCode, formattedNextDate, discount = '50') {

        cy.get('[name="code"]', { timeout: 10000 }).type(randomCode);
        cy.get('[name="usageLimit"]').type('1');
        cy.get('[name="discount"]').type(discount);
        cy.get('[name="maxDiscount"]').type(maxDiscount);
        cy.log(formattedNextDate);
        cy.get('[placeholder="Select date"]').clear({ force: true }).type(`${formattedNextDate}{enter}`, { force: true });
        cy.get('[name="description"]').eq(1).type('Generated with Cypress');
        cy.get('[id="rc_select_0"]').click();
        cy.get('[class="rc-virtual-list"]', { timeout: 15000 }).contains('Scanning & Error Resolution').click();
        cy.get('[id="rc_select_0"]').type('Battery Terminal Change');
        cy.get('[class="rc-virtual-list"]').contains('Battery Terminal Change').click();
        cy.get('[type="button"]').contains('Submit').click();

    }

    it('Should not be able to create vouchers with invalid date', () => {

        createVoucher(randomCode, formattedPreviousDate)
      //  cy.get('[class="ant-notification-notice-message"]', { timeout: 10000 }).should('have.text', 'Error Occured').log('Voucher Creation Unsuccesfull');
      cy.get('[class="ant-notification-notice-message"]', { timeout: 30000 }).invoke('text').then((text) => {
        cy.log("Notification Message: ", text);
      });
     
    
        cy.get('[class="ant-notification-notice-message"]')
          .should('have.text', 'Error Occured')
          

          //bug
     

    });

    it('Should not be able to create a voucher with an invalid discount percentage', () => {
        // var discount = "-100";
        createVoucher(randomCode1, formattedNextDate, "1000") //1000 is discount perecentage
        cy.get('[class="ant-notification-notice-message"]', { timeout: 30000 }).invoke('text').then((text) => {
            cy.log(text);
          });
        cy.get('[class="ant-notification-notice-message"]').should('have.text', 'Error Occured')
    });

    it('Should be able to create voucher', () => {

        createVoucher(randomCode2, formattedNextDate);
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).invoke('text').then((text) => {
            cy.log(text);
          });
        cy.get('[class="ant-notification-notice-message"]').should('have.text', 'Success').log('Voucher Created');
        

    });

    it('Should not be able to create voucher with already existing code', () => {

        createVoucher(randomCode2, formattedNextDate);
        cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).invoke('text').then((text) => {
            cy.log(text);
          });
        cy.get('[class="ant-notification-notice-message"]').should('have.text', 'Error Occured');

    });





    // it.only('Deleting voucher', () => {

    //     cy.request({
    //         method: 'POST',
    //         url: 'https://test.example.com/api/vouchers/update',
    //         body:{

    //              "_id": "654a0d6b0aba67d6e1327255",
    //               //  "code": "123",
    //                "description": "JNSAJK",
    //             //     "usageLimit": 283,
    //            //     "maxDiscount": 1000,
    //           //     "discount": 20,
    //          //     "fixPrice": 0,
    //         //     "isPublic": true,
    //        //     "onParts": false,
    //       //     "onServices": true,
    //      //     "expireOn": 1701388799999,
    //     //     "createdOn": 1697032069252,
    //    //     "services": [
    //   //       {
    //  //         "serviceId": "6463942334e872768eb05db4",
    // //         "name": "Complete Detailing"
    //             //       }
    //             //     ],
    //             //     "maps": [],
    //             //     "contact": "",
    //             //     "edit": true,
    //             //     "calendarDate": 1701302400000,
    //             // //    "updatedOn": 1699367673263

    //         }
    //     }).then((response) => {
    //         cy.log(response.status);
    //     })

    //});

    // it.only('DELETE', () => {

    //     cy.request({
    //         method: 'DELETE',
    //         url: 'https://test.example.com/api/vouchers/delete/6526a785bc09fde72f628d23',   
    //     });


}) 