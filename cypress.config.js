const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://www.saucedemo.com/v1',
    pageLoadTimeout: 120000,
    screenshotsFolder: 'cypress/screenshots',
    video: false, // Optional: enable video recording
    screenshotOnRunFailure: true,
  },
});