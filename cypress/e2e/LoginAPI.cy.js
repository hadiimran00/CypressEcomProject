
describe('Login API', () => {

  it('Successful Login',() => {

    cy.request({
      method: 'POST',
      url: 'https://test.example.com/api/users/login',
      body: {
        email: "nashit@example.com",
        password: "abc123++"
      }

    })

  })


  it('should fail to login with a username that is too long', () => {

    cy.request({
      method: 'POST',
      url: 'https://test.example.com/api/users/login',
      body: {
        email: "username".repeat(100),
        password: "abc123++"
      }, 
        failOnStatusCode: false
      

    }).then((response) => {

      expect(response.status).to.eq(401);
    })

  })

  it('should fail to login with blank email', () => {

    cy.request({
      method: 'POST',
      url: 'https://test.example.com/api/users/login',
      body: {
        email: "",
        password: "abc123++"
      }, 
        failOnStatusCode: false
      

    }).then((response) => {

      expect(response.status).to.eq(400);
    })

  })

  it('should fail to login with blank password', () => {

    cy.request({
      method: 'POST',
      url: 'https://test.example.com/api/users/login',
      body: {
        email: "nashit@example.com",
        password: ""
      },
      
        failOnStatusCode: false
      
    }).then((response) => {
      expect(response.status).to.eq(400);
    })

  })

  it('should fail to login with blank password and email', () => {

    cy.request({
      method: 'POST',
      url: 'https://test.example.com/api/users/login',
      body: {
        email: "",
        password: ""
      },
      
        failOnStatusCode: false
      
    }).then((response) => {
      expect(response.status).to.eq(400);
    })

  })

  it('Password is case sensitive?', () => {

    cy.request({
      method: 'POST',
      url: 'https://test.example.com/api/users/login',
      body: {
        email: "nashit@example.com",
        password: "ABC123++"
      },
      
        failOnStatusCode: false
      
    }).then((response) => {
      expect(response.status).to.eq(401);
    })

  })

})

  

  
