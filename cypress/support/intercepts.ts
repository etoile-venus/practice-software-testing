/// <reference types="cypress" />

import { apiBase } from '@utils/api'

const base = (): string => apiBase().replace(/\/$/, '')

export const routeAlias = {
  products: {
    list(alias = 'productsList'): string {
      cy.intercept('GET', `${base()}/products?**`).as(alias)
      return alias
    },
    search(alias = 'productsSearch'): string {
      cy.intercept('GET', `${base()}/products/search?**`).as(alias)
      return alias
    },
  },
  auth: {
    login(alias = 'postLogin'): string {
      cy.intercept('POST', `${base()}/users/login`).as(alias)
      return alias
    },
  },
}
