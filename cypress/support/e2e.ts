/// <reference types="cypress" />

import './commands'

const { register: registerCypressGrep } = require('@cypress/grep')

registerCypressGrep()

const KNOWN_HARMLESS_ERRORS: RegExp[] = [
  /^ResizeObserver loop limit exceeded$/,
  /^ResizeObserver loop completed with undelivered notifications\.$/,
]

Cypress.on('uncaught:exception', (err) => {
  if (KNOWN_HARMLESS_ERRORS.some((re) => re.test(err.message))) return false
  return true
})
