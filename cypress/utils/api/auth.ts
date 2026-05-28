import { apiBase } from './client'
import type { TokenResponse } from './types'

export const loginRaw = (email: string, password: string) =>
  cy.request<TokenResponse>({
    method: 'POST',
    url: `${apiBase()}/users/login`,
    body: { email, password },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  })
