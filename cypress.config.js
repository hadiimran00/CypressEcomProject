// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 2000,
  viewportHeight: 1500,
  
  e2e: {
   // testIsolation: false, // Disable test isolation to maintain cookies across tests
    baseUrl: 'https://uat.autocore.io/',
   // experimentalStudio: true,

    // Import Cypress plugins
    setupNodeEvents(on, config) {
     // return require('./cypress/plugins/index.js')(on, config);
    },

    // Session storage configuration
    // session: {
    //   storage: "localStorage"
    // }
  }
});
