export const apiBase = (): string =>
  (Cypress.env('API_BASE_URL') as string | undefined) ??
  'https://api.practicesoftwaretesting.com'
