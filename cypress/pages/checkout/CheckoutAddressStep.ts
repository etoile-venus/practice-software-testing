import { dt } from '@config/selectors'
import type { BillingAddressPayload } from '@factories/userFactory'

export class CheckoutAddressStep {
  get root() {
    return cy.get('app-address')
  }
  get street() {
    return cy.get(dt('street'))
  }
  get houseNumber() {
    return cy.get(dt('house_number'))
  }
  get postalCode() {
    return cy.get(dt('postal_code'))
  }
  get city() {
    return cy.get(dt('city'))
  }
  get state() {
    return cy.get(dt('state'))
  }
  get country() {
    return cy.get(dt('country'))
  }
  get proceedNext() {
    return cy.get(dt('proceed-3'))
  }

  fill(address: Partial<BillingAddressPayload>): this {
    if (address.street) this.street.clear().type(address.street)
    if (address.house_number) this.houseNumber.clear().type(address.house_number)
    if (address.postal_code) this.postalCode.clear().type(address.postal_code)
    if (address.city) this.city.clear().type(address.city)
    if (address.state) this.state.clear().type(address.state)
    if (address.country) this.country.select(address.country)
    return this
  }

  proceed(): this {
    this.proceedNext.click()
    return this
  }
}
