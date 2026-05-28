import { dt } from '@config/selectors'
import { Routes } from '@config/routes'
import { HomePage } from '@pages/HomePage'
import { Api } from '@utils/api'

const TOKEN_STORAGE_KEY = 'auth-token'

export class LoginPage {
  get form() {
    return cy.get(dt('login-form'))
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
  get registerLink() {
    return cy.get(dt('register-link'))
  }
  get forgotLink() {
    return cy.get(dt('forgot-password-link'))
  }

  get fieldErrors() {
    return cy.get('.help-block, .invalid-feedback')
  }
  get emailError() {
    return cy.get(dt('email-error'))
  }
  get passwordError() {
    return cy.get(dt('password-error'))
  }
  get topAlert() {
    return cy.get('[role="alert"], .alert')
  }

  visit(): this {
    cy.visit(Routes.login)
    this.form.should('be.visible')
    return this
  }

  assertOnPage(): this {
    cy.location('pathname').should('eq', Routes.login)
    return this
  }

  submitCredentials(email: string, password: string): this {
    if (email) this.email.clear().type(email)
    if (password) this.password.clear().type(password, { log: false })
    this.submit.click()
    return this
  }

  login(email: string, password: string): HomePage {
    cy.session(
      ['api-login', email],
      () => {
        Api.auth.loginRaw(email, password).then((res) => {
          expect(res.status, `login ${email}`).to.eq(200)

          const token = res.body.access_token
          expect(token, `token ${email}`).to.be.a('string')
          expect(token, `token ${email}`).to.not.equal('')

          cy.visit(Routes.home, {
            onBeforeLoad(win) {
              win.localStorage.setItem(TOKEN_STORAGE_KEY, token)
            },
          })
        })
      },
      {
        validate() {
          cy.window().then((win) => {
            const token = win.localStorage.getItem(TOKEN_STORAGE_KEY)
            expect(token, 'auth token').to.be.a('string')
            expect(token, 'auth token').to.not.equal('')
          })
        },
      },
    )
    cy.visit(Routes.home)
    return new HomePage()
  }
}
