import { app } from '@pages/PageManager'
import { Products } from '@fixtures/products'

describe('Catalog - Product detail', () => {
  beforeEach(() => {
    app.home.visit()
  })

  it(
    'TC01 -opens the detail page for a product clicked from the grid',
    { tags: ['@smoke', '@catalog', '@positive'] },
    () => {
      app.home.search('pliers').selectProduct(Products.known.name)
      app.productDetail.name.should(($name) => {
        expect($name.text().trim()).to.equal(Products.known.name)
      })
      app.productDetail.description.should('be.visible')
      app.productDetail.addToCartButton.should('be.visible')
    },
  )

  it(
    'TC02 - updates quantity before adding to cart',
    { tags: ['@regression', '@catalog', '@cart'] },
    () => {
      // We could move the these numbers to the products fixture if we want to test with different quantities
      app.home.search('pliers').selectProduct(Products.known.name)
      app.productDetail.quantityInput.should('have.value', '1')
      app.productDetail.addQuantity(2)
      app.productDetail.quantityInput.should('have.value', '3')
      app.productDetail.addToCart()
      app.header.cartBadge.should('have.text', '3')
    },
  )
})
