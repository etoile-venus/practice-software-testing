import { Routes } from '@config/routes'

export class AccountPage {
  assertOnPage(): this {
    cy.location('pathname').should('eq', Routes.account)
    return this
  }
}
