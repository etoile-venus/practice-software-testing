import { app } from '@pages/PageManager'
import { Users } from '@fixtures/users'
import { loginInvalidEmails } from '@fixtures/data/invalidEmails'

describe('Auth - Login', () => {
  beforeEach(() => {
    app.login.visit()
  })

  it('LOGIN_TC01 - displays the login form', { tags: ['@smoke', '@auth'] }, () => {
    app.login.email.should('be.visible')
    app.login.password.should('be.visible')
    app.login.submit.should('be.visible').and('have.value', 'Login')
  })

  it(
    'LOGIN_TC02 - blocks login when the email field is empty',
    { tags: ['@regression', '@auth', '@negative'] },
    () => {
      app.login.submitCredentials('', 'Qa27!flow')
      app.login.emailError.should('contain.text', 'Email is required')
    },
  )

  loginInvalidEmails.forEach(({ value, reason }) => {
    it(
      `LOGIN_TC03 - rejects invalid email format (${reason})`,
      { tags: ['@regression', '@auth', '@negative'] },
      () => {
        app.login.submitCredentials(value, 'Qa27!flow')
        app.login.emailError.should('be.visible').and('contain.text', 'Email format is invalid')
      },
    )
  })

  it(
    'LOGIN_TC04 - blocks login when the password field is empty',
    { tags: ['@regression', '@auth', '@negative'] },
    () => {
      app.login.submitCredentials('user@example.com', '')
      app.login.passwordError.should('be.visible').and('contain.text', 'Password is required')
    },
  )

  it(
    'LOGIN_TC05 - authenticates a registered user with valid credentials',
    { tags: ['@smoke', '@auth', '@positive'] },
    () => {
      app.login.submitCredentials(Users.standard.email, Users.standard.password)
      app.account.assertOnPage()
      app.header.signInLink.should('not.exist')
      app.header.menu.should('be.visible')
    },
  )

  it(
    'LOGIN_TC06 - shows an error message on incorrect credentials',
    { tags: ['@regression', '@auth', '@negative'] },
    () => {
      app.login.submitCredentials('notarealuser@example.com', 'wrongpass')
      app.login.topAlert.should('be.visible').and('contain.text', 'Invalid email or password')
    },
  )

  // it.skip preskače test ali ga i dalje prikazuje u rezultatima kao "pending"
  // Korisno kad znaš šta treba testirati ali još nisi stigao, ili kad čekaš fix
  it.skip(
    'LOGIN_TC07 - forgot password link navigates to the reset page',
    { tags: ['@regression', '@auth'] },
    () => {
      app.login.forgotLink.click()
      cy.url().should('include', '/forgot-password')
    },
  )
})
