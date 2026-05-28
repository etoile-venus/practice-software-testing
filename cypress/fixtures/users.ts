export interface TestUser {
  email: string
  password: string
}

const env = (key: string): string => {
  const v = Cypress.expose(key) as string | undefined
  if (!v) throw new Error(`Missing Cypress env var: ${key}`)
  return v
}

export const Users = {
  get standard(): TestUser {
    return { email: env('STANDARD_EMAIL'), password: env('STANDARD_PASSWORD') }
  },
  get admin(): TestUser {
    return { email: env('ADMIN_EMAIL'), password: env('ADMIN_PASSWORD') }
  },
}
