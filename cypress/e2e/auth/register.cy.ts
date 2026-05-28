import { app } from '@pages/PageManager'
import { aUser } from '@factories/userFactory'
import { registrationInvalidEmails } from '@fixtures/data/invalidEmails'
import { registrationRequiredFieldErrors } from '@fixtures/data/registrationValidation'
import { Routes } from '@config/routes'

describe('Auth - Registration', () => {
  it('REG_TC01 - opens the registration page from the login link', { tags: ['@smoke', '@auth'] }, () => {
    app.login.visit()
    app.login.registerLink.click()
    app.register.assertOnPage()
  })

  it('REG_TC02 - blocks submission when required fields are empty', { tags: ['@regression', '@auth', '@negative'] }, () => {
    app.register.visit().clickSubmit()
    app.register.fieldErrors.should('have.length', registrationRequiredFieldErrors.length)

    registrationRequiredFieldErrors.forEach(({ dataTest, message }) => {
      app.register.fieldError(dataTest).should('be.visible').and('contain.text', message)
    })
  })

  registrationInvalidEmails.forEach(({ value, reason }) => {
    it(
      `REG_TC03 - rejects invalid email format (${reason})`,
      { tags: ['@regression', '@auth', '@negative'] },
      () => {
        app.register.visit().fill(aUser({ email: value })).clickSubmit()
        app.register.emailError.should('be.visible').and('contain.text', 'Email format is invalid')
      },
    )
  })

  it(
    'REG_TC04 - registers a new customer with valid data',
    { tags: ['@smoke', '@auth', '@positive'] },
    () => {
      app.register.visit().register(aUser())
      cy.url().should('include', Routes.login)
    },
  )
})
