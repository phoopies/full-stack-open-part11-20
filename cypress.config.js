// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress')
const { PORT } = require('./config/common')

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 200000,
    baseUrl: `http://localhost:${PORT}`,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
})
