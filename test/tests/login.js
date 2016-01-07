/* globals describe, before, it */
'use strict'

const Browser = require('zombie')
const assert = require('assert')
const config = require('../../config')

const elements = {
  simpleLoginTab: '.tabs-below li:nth-child(1) a',
  advancedLoginTab: '.tabs-below li:nth-child(2) a',
  advancedLoginForm: '.tabs-below .tab-pane:nth-child(2).active',
  email:    '.tabs-below .tab-pane:nth-child(2).active input[name="email"]',
  password: '.tabs-below .tab-pane:nth-child(2).active input[name="password"]',
  submit:   '.tabs-below .tab-pane:nth-child(2).active button[type="submit"]',
  footer: 'footer'
}

const xpaths = {
  userNotFound: '//*[text()[starts-with(., "User") and contains(., "not found")]]',
  loginFailed: '//*[text()[contains(., "Login failed")]]'
}

Browser.localhost('local.universitysite.com', 80)

describe('Login: User visits login page', () => {
  const browser = new Browser()

  before(  function(done) {
    this.timeout(15000)
    browser.visit(`${config.appRoot}/login?logout`, done)
  })

  it('should have simple tab', () => {
    browser.assert.element(elements.simpleLoginTab)
  })
  it('should have advanced tab', () => {
    browser.assert.element(elements.advancedLoginTab)
  })

  describe('User visits advanced login tab', () => {

    before( function(done) {
      this.timeout(15000)
      browser.clickLink(elements.advancedLoginTab, done)
    })

    it('should have advanced login form', () => {
      browser.assert.element(elements.advancedLoginForm)
    })
    it('should have email field', () => {
      browser.assert.element(elements.email)
    })
    it('should have password field', () => {
      browser.assert.element(elements.password)
    })
    it('should have submit button', () => {
      browser.assert.element(elements.submit)
    })

    describe('User attempts to login with incorrect email', () => {

        before( function(done) {
          this.timeout(15000)
          browser.fill(elements.email, 'xxx@yyy.com')
          browser.fill(elements.password, 'password')
          browser.pressButton(elements.submit, () => done())
        })

        it('should report user not found', () => {
          assert(browser.xpath(xpaths.userNotFound).iterateNext())
        })
    })

    describe('User attempts to login with incorrect password', () => {

        before( function(done) {
          this.timeout(15000)
          browser.fill(elements.email, config.email)
          browser.fill(elements.password, 'password')
          browser.pressButton(elements.submit, () => done())
        })

        it('should report login failed', () => {
          assert(browser.xpath(xpaths.loginFailed).iterateNext())
        })

    })

    describe('User logs in', () => {

        before( function(done) {
          this.timeout(15000)
          browser.fill(elements.email, config.email)
          browser.fill(elements.password, config.password)
          browser.pressButton(elements.submit, () => done())
        })

        it('should NOT report user not found', () => {
          assert(!browser.xpath(xpaths.userNotFound).iterateNext())
        })
        it('should NOT report login failed', () => {
          assert(!browser.xpath(xpaths.loginFailed).iterateNext())
        })
        it('should have correct page title', () => {
          browser.assert.text('title', 'LearningSite')
        })

    })

  })

})
