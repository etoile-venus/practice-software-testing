import { app } from '@pages/PageManager'
import { Users } from '@fixtures/users'
import { Products } from '@fixtures/products'
import { anAddress } from '@factories/userFactory'

describe('Buying - Checkout', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    app.login.login(Users.standard.email, Users.standard.password)
    app.home.search('pliers').selectProduct(Products.known.name)
    app.productDetail.addToCart()
    app.header.gotoCart()
  })

  it(
    'TC01 - walks the wizard from cart to confirmation',
    { tags: ['@smoke', '@checkout', '@positive'] },
    () => {
      app.cart.proceedToCheckout()
      app.checkout.signIn.proceed()
      app.checkout.address.fill(anAddress()).proceed()
      app.checkout.payment.selectPaymentMethod('cash-on-delivery').finish()
      cy.get('.alert').should('be.visible').and('contain.text', 'Payment was successful')
    },
  )

  it(
    'TC02 - blocks the address step when required fields are missing',
    { tags: ['@regression', '@checkout', '@negative'] },
    () => {
      app.cart.proceedToCheckout()
      app.checkout.signIn.proceed()
      app.checkout.address.street.clear()
      app.checkout.address.proceedNext.should('be.disabled')
    },
  )
})
