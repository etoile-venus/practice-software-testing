import { app } from '@pages/PageManager'
import { Products } from '@fixtures/products'

describe('Buying - Cart', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    app.home.visit()
  })

  it(
    'TC01 - shows the added product on the cart page',
    { tags: ['@regression', '@cart', '@positive'] },
    () => {
      app.home.search('pliers').selectProduct(Products.known.name)
      app.productDetail.addToCart()
      app.header.gotoCart()
      app.cart.rows.should('have.length', 1)
      app.cart.productTitles.should('contain.text', Products.known.name)
    },
  )

  it(
    'TC02 - removes a product from the cart',
    { tags: ['@regression', '@cart', '@negative'] },
    () => {
      app.home.search('pliers').selectProduct(Products.known.name)
      app.productDetail.addToCart()
      app.header.gotoCart()
      app.cart.rows.should('have.length', 1)
      app.cart.removeRow(0)
      app.cart.rows.should('not.exist')
    },
  )
})
