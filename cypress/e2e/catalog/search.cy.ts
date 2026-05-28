import { app } from '@pages/PageManager'
import { Products } from '@fixtures/products'
import { routeAlias } from '@support/intercepts'

describe('Catalog - Search and filter', () => {
  beforeEach(() => {
    app.home.visit()
  })

  it('TC01 - shows search, filter, and sort controls', { tags: ['@smoke', '@catalog'] }, () => {
    app.home.searchInput.should('be.visible')
    app.home.searchSubmit.should('be.visible')
    app.home.sortDropdown.should('be.visible')
    app.home.categoryCheckboxes.should('have.length.greaterThan', 0)
    app.home.brandCheckboxes.should('have.length.greaterThan', 0)
  })

  Products.searchTerms.forEach((term) => {
    it(
      `TC02 - search returns results for "${term}"`,
      { tags: ['@regression', '@catalog', '@positive'] },
      () => {
        const alias = routeAlias.products.search()
        app.home.search(term)
        cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200)
        app.home.productCards.should('have.length.greaterThan', 0)
        app.home.productNames.each(($el) => {
          expect($el.text().toLowerCase()).to.include(term.toLowerCase())
        })
      },
    )
  })

  Products.sortOptions.forEach(({ testName, value, field, direction }) => {
    it(`TC03 - ${testName}`, { tags: ['@regression', '@catalog'] }, () => {
      const sortAlias = routeAlias.products.list('productsSort')

      app.home.selectSort(value)
      cy.wait(`@${sortAlias}`).its('response.statusCode').should('eq', 200)
      app.home.sortDropdown.should('have.value', value)

      switch (field) {
        case 'price':
          app.home.productPrices.then(($prices) => {
            const visiblePrices = $prices
              .toArray()
              .map((element) => parseFloat(element.textContent!.replace('$', '').trim()))
            const sortedPrices = [...visiblePrices].sort((a, b) =>
              direction === 'asc' ? a - b : b - a,
            )

            expect(visiblePrices).to.deep.equal(sortedPrices)
          })
          break

        case 'name':
          app.home.productNames.then(($names) => {
            const visibleNames = $names.toArray().map((element) => element.textContent!.trim())
            const sortedNames = [...visibleNames].sort((a, b) =>
              direction === 'asc'
                ? a.localeCompare(b, undefined, { sensitivity: 'base' })
                : b.localeCompare(a, undefined, { sensitivity: 'base' }),
            )

            expect(visibleNames).to.deep.equal(sortedNames)
          })
          break
      }
    })
  })
})
