import { dt } from '@config/selectors'

export class HeaderComponent {
  get root() {
    return cy.get('app-header')
  }
  get logo() {
    return cy.get(dt('nav-home'))
  }
  get menu() {
    return cy.get(dt('nav-menu'))
  }
  get categoriesLink() {
    return cy.get(dt('nav-categories'))
  }
  get contactLink() {
    return cy.get(dt('nav-contact'))
  }
  get signInLink() {
    return cy.get(dt('nav-sign-in'))
  }
  get cartLink() {
    return cy.get(dt('nav-cart'))
  }
  get languageSelect() {
    return cy.get(dt('language-select'))
  }
  get cartBadge() {
    return cy.get(dt('cart-quantity'))
  }

  gotoHome(): this {
    this.logo.click()
    return this
  }

  gotoLogin(): this {
    this.signInLink.click()
    return this
  }

  gotoCart(): this {
    this.cartLink.click()
    return this
  }

  assertCartCount(count: number): this {
    if (count === 0) {
      this.cartBadge.should('not.exist')
    } else {
      this.cartBadge.should('have.text', String(count))
    }
    return this
  }

  assertSignedIn(): this {
    this.signInLink.should('not.exist')
    return this
  }

  assertSignedOut(): this {
    this.signInLink.should('be.visible')
    return this
  }
}
