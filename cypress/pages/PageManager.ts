import { HeaderComponent } from '@pages/components/HeaderComponent'
import { LoginPage } from '@pages/LoginPage'
import { RegisterPage } from '@pages/RegisterPage'
import { HomePage } from '@pages/HomePage'
import { AccountPage } from '@pages/AccountPage'
import { ProductDetailPage } from '@pages/ProductDetailPage'
import { CartPage } from '@pages/CartPage'
import { CheckoutFlow } from '@pages/checkout/CheckoutFlow'

export class PageManager {
  private _header: HeaderComponent | undefined
  private _login: LoginPage | undefined
  private _register: RegisterPage | undefined
  private _home: HomePage | undefined
  private _account: AccountPage | undefined
  private _productDetail: ProductDetailPage | undefined
  private _cart: CartPage | undefined
  private _checkout: CheckoutFlow | undefined

  get header(): HeaderComponent {
    if (this._header === undefined) this._header = new HeaderComponent()
    return this._header
  }
  get login(): LoginPage {
    if (this._login === undefined) this._login = new LoginPage()
    return this._login
  }
  get register(): RegisterPage {
    if (this._register === undefined) this._register = new RegisterPage()
    return this._register
  }
  get home(): HomePage {
    if (this._home === undefined) this._home = new HomePage()
    return this._home
  }
  get account(): AccountPage {
    if (this._account === undefined) this._account = new AccountPage()
    return this._account
  }
  get productDetail(): ProductDetailPage {
    if (this._productDetail === undefined) this._productDetail = new ProductDetailPage()
    return this._productDetail
  }
  get cart(): CartPage {
    if (this._cart === undefined) this._cart = new CartPage()
    return this._cart
  }
  get checkout(): CheckoutFlow {
    if (this._checkout === undefined) this._checkout = new CheckoutFlow()
    return this._checkout
  }
}

export const app = new PageManager()
