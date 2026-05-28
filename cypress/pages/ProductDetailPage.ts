import { dt } from '@config/selectors'

export class ProductDetailPage {
  get name() {
    return cy.get(dt('product-name'))
  }
  get price() {
    return cy.get(dt('unit-price'))
  }
  get description() {
    return cy.get(dt('product-description'))
  }
  get specsTable() {
    return cy.get(dt('product-specs'))
  }
  get quantityInput() {
    return cy.get(dt('quantity'))
  }
  get increaseQuantity() {
    return cy.get(dt('increase-quantity'))
  }
  get decreaseQuantity() {
    return cy.get(dt('decrease-quantity'))
  }
  get addToCartButton() {
    return cy.get(dt('add-to-cart'))
  }
  get addToFavorites() {
    return cy.get(dt('add-to-favorites'))
  }
  get addToCompare() {
    return cy.get(dt('add-to-compare'))
  }
  get outOfStockBadge() {
    return cy.get(dt('out-of-stock'))
  }
  get notification() {
    return cy.get(dt('notification-bar'))
  }

  setQuantity(quantity: number): this {
    this.quantityInput.clear().type(String(quantity))
    return this
  }

  addQuantity(quantityNumber: number): this {
    for (let i = 0; i < quantityNumber; i++) {
      this.increaseQuantity.click()
    }
    return this
  }

  subQuantity(quantityNumber: number): this {
    for (let i = 0; i < quantityNumber; i++) {
      this.decreaseQuantity.click()
    }
    return this
  }

  addToCart(): this {
    this.addToCartButton.click()
    return this
  }
}
