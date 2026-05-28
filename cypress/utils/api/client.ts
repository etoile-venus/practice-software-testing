export const apiBase = (): string =>
  (Cypress.expose('API_BASE_URL') as string | undefined) ??
  'https://api.practicesoftwaretesting.com'
