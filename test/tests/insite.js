/* globals describe, before, it */
'use strict'

const Browser = require('zombie')
const auth = require('../modules/auth')
const config = require('../../config')

const routes = [
  '/',
  '/account',
  '/create-account',
  '/admin',
  '/admin/audiences',
  '/changes',
  '/drafts',
  '/post/new',
  '/post/1',
  '/post/1/views',
  '/tag/1',
  '/tags',
  '/user/1'
]

const elements = {
  footer: 'footer'
}

Browser.localhost('local.universitysite.com', 80)
const browser = new Browser()

describe('User logs in', () => {

  before( function(done) {
    this.timeout(15000)
    auth.login(browser, done)
  })

  it('should be logged in', () => {
    browser.assert.text('title', 'LearningSite')
  })

  routes.forEach( (route) => {

    describe(`User visits ${route} page`, () => {

      before(function(done) {
        this.timeout(15000)
        browser.visit(`${config.appRoot}/insite/#!${route}`, () => done() )
      })

      it('page should load', () => {
        browser.assert.element(elements.footer)
      })
    })
  })
})
