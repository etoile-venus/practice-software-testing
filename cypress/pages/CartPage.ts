import { dt } from '@config/selectors'
import { Routes } from '@config/routes'

export class CartPage {
  get root() {
    return cy.get('app-cart')
  }
  get rows() {
    return this.root.find('tbody tr')
  }
  get productTitles() {
    return cy.get(dt('product-title'))
  }
  get productPrice() {
    return cy.get(dt('product-price'))
  }
  get productQuantity() {
    return cy.get(dt('product-quantity'))
  }
  get linePrice() {
    return cy.get(dt('line-price'))
  }
  get cartTotal() {
    return cy.get(dt('cart-total'))
  }
  get continueShopping() {
    return cy.get(dt('continue-shopping'))
  }
  get proceedButton() {
    return cy.get(dt('proceed-1'))
  }

  visit(): this {
    cy.visit(Routes.checkout)
    this.root.should('be.visible')
    return this
  }

  assertOnPage(): this {
    cy.location('pathname').should('eq', Routes.checkout)
    return this
  }

  setQuantityForRow(rowIndex: number, quantity: number): this {
    this.productQuantity.eq(rowIndex).clear().type(String(quantity)).blur()
    return this
  }

  removeRow(rowIndex: number): this {
    this.rows.eq(rowIndex).find('button, a').filter('.btn-danger').click()
    return this
  }

  proceedToCheckout(): this {
    this.proceedButton.click()
    return this
  }
}
