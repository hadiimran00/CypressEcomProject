
//Make sure there is no Maker or Test Vehicle already added before running this test

describe('Vehicles Tab', () => {

  before('Session', () => {

    cy.log('Make sure there is no Test Maker or Test Vehicle already added before running this test');

    cy.session('my-session', () => {
      cy.visit('/');
      cy.get('[type="text"]').type('mhadiimran042@gmail.com');
      cy.get('[type="password"]').type('qwerty');
      cy.get('[type="button"]').click();
    })

  })

  beforeEach('Opening Vehicles Tab', () => {

    cy.visit('/');
    cy.get('[type="button"]').click();
    cy.get('.custom-menu', { timeout: 40000 }).contains('Vehicles').click();

  })

  it('Adding Vehicle', () => {

    //Maker
    cy.get('[placeholder="Enter maker Full Name"]').type('Test Maker');
    cy.get('[placeholder="Enter maker sequence"]').type('0');
    cy.get('[type="button"]').contains('Submit').click();
    cy.get('[class="ant-notification-notice-message"]', { timeout: 40000 }).should('have.text', 'Success');
    cy.get('[data-row-key="65522ac04a0eb454a5335caf"]').should('have.text', 'Test Maker');

    //Vehicle
    cy.get('.ant-select-selector').eq(0).type('Test');

    //scroll
    // cy.get('.ant-select-item-option-content', { timeout: 10000 }).contains('Test Maker').click();
    //cy.get('.ant-select-selector').eq(0)
    //.scrollTo('bottom',{ensureScrollable: false});
    cy.get('.ant-select-item-option-content', { timeout: 10000 })
      // .scrollTo('top',{ensureScrollable: false})
      .contains('Test Maker')
      // .scrollIntoView() // Scroll into view before clicking
      .click();


    cy.get('[name="name"]').eq('1').type('Test Vehicle');
    cy.get('[name="minBatteryCapacity"]').eq('0').type('99');
    cy.get('[name="maxBatteryCapacity"]').eq('0').type('99');
    cy.get('[name="engineSize"]').type('2000{enter}');
    cy.get('[name="sequence"]').eq('1').type('0');
    cy.get('[type="button"]').eq('5').click();
    cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 }).should('have.text', 'Success');
    cy.get('[style="position: absolute; left: 100px; top: 0px; height: 68px; width: 150px;"]').should('have.text', 'Test Vehicle');

    //Variant

    cy.get('[class="ant-select-selection-item"]').eq('1').type('Test');
    cy.get('[class="ant-select-item-option-content"]', { timeout: 10000 }).contains('Test Vehicle').click();
    cy.get('[name="name"]').eq(2).type('Test Vehicle');
    cy.get('[name="engineNo"]').type('12345qwerty');
    cy.get('.ant-select-selection-item').eq(2).type('Sedan');

    
    cy.get('[class="ant-select-item-option-content"]').contains('Sedan').click({ force: true });
    cy.get('[name="minYear"]').type('2003');
    cy.get('[name="maxYear"]').type('2023');
    cy.get('.ant-select-selection-item').eq(3).click();
    cy.get('[class="ant-select-item-option-content"]').contains('Petrol').click();
    cy.get('[class="ant-select-selection-item"]').eq(4).click();
    cy.get('[class="ant-select-item-option-content"]').contains('2000').click();
    cy.get('[class="ant-select-selection-item"]').eq(5).click();
    cy.get('[class="ant-select-item-option-content"]').contains('Manual').click();
    cy.get('[class="ant-select-selection-item"]').eq(6).click();
    cy.get('[class="ant-select-item ant-select-item-option"]').contains('CVTF TC').click();
    cy.get('[name="gearOilCapacity"]').type('2.5');
    cy.get('[name="engineOilCapacity"]').type('4');
    cy.get('[class="ant-select-selector"]').eq(7).click();
    cy.get('[class="ant-select-item-option-content"]').contains('5W-30').click();
    cy.get('[name="tyreBase"]').type('195');
    cy.get('[name="tyreProfile"]').type('50');
    cy.get('[name="tyreRim"]').type('15');
    cy.get('[type="checkbox"]').eq(0).check();
    cy.get('[type="checkbox"]').eq(1).check();
    cy.get('[type="checkbox"]').eq(2).check();
    cy.get('[name="comments"]').type('For testing');
    cy.get('[type="button"]').contains('Submit').click();
  });

  it('Deleting Vehicle', () => {

    // cy.get('[data-row-key="65522ac04a0eb454a5335caf"]',{timeout : 10000})
    // //.contains('Test Maker', {timeout : 200000})
    // .find('.anticon anticon-delete').click({force: true});

    //Delete Maker
    cy.get('[data-row-key="65522ac04a0eb454a5335caf"] > :nth-child(2)', { timeout: 20000 }).click();
    cy.get('.ant-btn-primary').click();
    cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 }).should('have.text', 'Success');

    //delete Vehicle
    //  cy.get('.virtual-table-cell-last.active-virtual-cell')










  });



})  