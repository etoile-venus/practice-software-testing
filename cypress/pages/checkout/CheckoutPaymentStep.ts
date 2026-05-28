import { dt } from '@config/selectors'
import type { PaymentMethod } from '@utils/api'

export class CheckoutPaymentStep {
  get root() {
    return cy.get('app-payment')
  }
  get paymentMethod() {
    return cy.get(dt('payment-method'))
  }
  get finishButton() {
    return cy.get(dt('finish'))
  }

  selectPaymentMethod(method: PaymentMethod): this {
    this.paymentMethod.select(method)
    return this
  }

  finish(): this {
    this.finishButton.click()
    return this
  }
}
