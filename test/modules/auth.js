'use strict'

const config = require('../../config')

const elements = {
  advancedLoginTab: '.tabs-below li:nth-child(2) a',
  email:    '.tabs-below .tab-pane:nth-child(2).active input[name="email"]',
  password: '.tabs-below .tab-pane:nth-child(2).active input[name="password"]',
  submit:   '.tabs-below .tab-pane:nth-child(2).active button[type="submit"]'
}

function login(browser, done) {
  browser.visit(`${config.appRoot}/login?logout`, () => {
    browser.clickLink(elements.advancedLoginTab, () => {
      browser.fill(elements.email, config.email)
      browser.fill(elements.password, config.password)
      browser.pressButton(elements.submit, () => done() )
    })
  })
}

module.exports = {
  login: login
}
