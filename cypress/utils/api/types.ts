export interface TokenResponse {
  access_token: string
  token_type: 'Bearer' | string
  expires_in: number
}

export interface UserAddress {
  street?: string
  house_number?: string | null
  city?: string
  state?: string | null
  country?: string
  postal_code?: string | null
}

export interface UserRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  dob?: string
  phone?: string
  address?: UserAddress
}

export type PaymentMethod =
  | 'bank-transfer'
  | 'cash-on-delivery'
  | 'credit-card'
  | 'buy-now-pay-later'
  | 'gift-card'
