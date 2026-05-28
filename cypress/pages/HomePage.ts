import { dt, dtPrefix } from '@config/selectors'
import { Routes } from '@config/routes'
import { ProductDetailPage } from '@pages/ProductDetailPage'

const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export class HomePage {
  get searchInput() {
    return cy.get(dt('search-query'))
  }
  get searchSubmit() {
    return cy.get(dt('search-submit'))
  }
  get searchReset() {
    return cy.get(dt('search-reset'))
  }

  get filtersPanel() {
    return cy.get(dt('filters'))
  }
  get categoryCheckboxes() {
    return cy.get(dtPrefix('category-'))
  }
  get brandCheckboxes() {
    return cy.get(dtPrefix('brand-'))
  }
  get ecoFriendlyToggle() {
    return cy.get(dt('eco-friendly-filter'))
  }
  get sortDropdown() {
    return cy.get(dt('sort'))
  }

  get productCards() {
    return cy.get(dtPrefix('product-'))
  }
  get productNames() {
    return cy.get(dt('product-name'))
  }
  get productPrices() {
    return cy.get(dt('product-price'))
  }
  get paginationNext() {
    return cy.get(dt('pagination-next'))
  }
  get paginationPrev() {
    return cy.get(dt('pagination-prev'))
  }

  visit(): this {
    cy.visit(Routes.home)
    this.productCards.first().should('be.visible')
    return this
  }

  assertOnPage(): this {
    cy.location('pathname').should('eq', Routes.home)
    return this
  }

  search(query: string): this {
    this.searchInput.clear().type(query)
    this.searchSubmit.click()
    return this
  }

  typeSearch(query: string): this {
    this.searchInput.clear().type(query)
    return this
  }

  submitSearch(): this {
    this.searchSubmit.click()
    return this
  }

  resetSearch(): this {
    this.searchReset.click()
    return this
  }

  selectCategory(label: string): this {
    cy.contains('label', new RegExp(`^\\s*${escapeRegex(label)}\\s*$`))
      .find('input[type="checkbox"]')
      .check({ force: true })
    return this
  }

  selectBrand(label: string): this {
    cy.contains('label', new RegExp(`^\\s*${escapeRegex(label)}\\s*$`))
      .find('input[type="checkbox"]')
      .check({ force: true })
    return this
  }

  selectSort(value: string): this {
    this.sortDropdown.select(value)
    return this
  }

  toggleEcoFriendly(): this {
    this.ecoFriendlyToggle.click()
    return this
  }

  selectProduct(name: string): ProductDetailPage {
    cy.contains(dt('product-name'), name).click()
    return new ProductDetailPage()
  }
}
