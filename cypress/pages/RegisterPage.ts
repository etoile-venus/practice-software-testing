import { dt } from '@config/selectors'
import { Routes } from '@config/routes'
import type { UserRequest } from '@utils/api'

export class RegisterPage {
  get form() {
    return cy.get(dt('register-form'))
  }
  get firstName() {
    return cy.get(dt('first-name'))
  }
  get lastName() {
    return cy.get(dt('last-name'))
  }
  get dob() {
    return cy.get(dt('dob'))
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
  get phone() {
    return cy.get(dt('phone'))
  }
  get email() {
    return cy.get(dt('email'))
  }
  get emailError() {
    return cy.get(dt('email-error'))
  }
  get password() {
    return cy.get(dt('password'))
  }
  get submit() {
    return cy.get(dt('register-submit'))
  }

  get fieldErrors() {
    return cy.get('[data-test$="-error"][role="alert"]')
  }
  get topAlert() {
    return cy.get('[role="alert"], .alert')
  }

  fieldError(dataTest: string) {
    return cy.get(dt(dataTest))
  }

  visit(): this {
    cy.visit(Routes.register)
    this.form.should('be.visible')
    return this
  }

  assertOnPage(): this {
    cy.location('pathname').should('eq', Routes.register)
    return this
  }

  fill(payload: Partial<UserRequest>): this {
    if (payload.first_name) this.firstName.clear().type(payload.first_name)
    if (payload.last_name) this.lastName.clear().type(payload.last_name)
    if (payload.dob) this.dob.clear().type(payload.dob)
    if (payload.phone) this.phone.clear().type(payload.phone)
    if (payload.email) this.email.clear().type(payload.email)
    if (payload.password) this.password.clear().type(payload.password, { log: false })

    const a = payload.address
    if (a) {
      if (a.street) this.street.clear().type(a.street)
      if (a.house_number) this.houseNumber.clear().type(a.house_number)
      if (a.postal_code) this.postalCode.clear().type(a.postal_code)
      if (a.city) this.city.clear().type(a.city)
      if (a.state) this.state.clear().type(a.state)
      if (a.country) this.country.select(a.country)
    }
    return this
  }

  clickSubmit(): this {
    this.submit.click()
    return this
  }

  register(payload: UserRequest): this {
    return this.fill(payload).clickSubmit()
  }
}
