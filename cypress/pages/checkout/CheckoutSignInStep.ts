import { dt } from '@config/selectors'

export class CheckoutSignInStep {
  get root() {
    return cy.get('app-login')
  }
  get email() {
    return cy.get(dt('email'))
  }
  get password() {
    return cy.get(dt('password'))
  }
  get submit() {
    return cy.get(dt('login-submit'))
  }
  get proceedNext() {
    return cy.get(dt('proceed-2'))
  }

  signIn(email: string, password: string): this {
    this.email.clear().type(email)
    this.password.clear().type(password, { log: false })
    this.submit.click()
    return this
  }

  proceed(): this {
    this.proceedNext.click()
    return this
  }
}
