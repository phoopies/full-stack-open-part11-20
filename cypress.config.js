// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 200000,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
})
