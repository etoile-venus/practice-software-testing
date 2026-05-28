/// <reference types="cypress" />

Cypress.Commands.add('byDataTest', (name: string) => {
  return cy.get(`[data-test="${name}"]`)
})

declare global {
  namespace Cypress {
    interface Chainable {
      byDataTest(name: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

export {}
