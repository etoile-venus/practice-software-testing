import { CheckoutSignInStep } from './CheckoutSignInStep'
import { CheckoutAddressStep } from './CheckoutAddressStep'
import { CheckoutPaymentStep } from './CheckoutPaymentStep'

export class CheckoutFlow {
  private _signIn: CheckoutSignInStep | undefined
  private _address: CheckoutAddressStep | undefined
  private _payment: CheckoutPaymentStep | undefined

  get signIn(): CheckoutSignInStep {
    if (this._signIn === undefined) this._signIn = new CheckoutSignInStep()
    return this._signIn
  }
  get address(): CheckoutAddressStep {
    if (this._address === undefined) this._address = new CheckoutAddressStep()
    return this._address
  }
  get payment(): CheckoutPaymentStep {
    if (this._payment === undefined) this._payment = new CheckoutPaymentStep()
    return this._payment
  }
}
