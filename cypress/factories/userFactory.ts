import { faker } from '@faker-js/faker'
import type { UserRequest } from '@utils/api'

export const aUser = (overrides: Partial<UserRequest> = {}): UserRequest => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  dob: '1990-01-01',
  phone: faker.string.numeric(10),
  email: `e2e_${faker.string.alphanumeric(10)}@example.com`,
  password: 'Qa27!flow',
  address: {
    street: faker.location.street(),
    house_number: String(faker.number.int({ min: 1, max: 999 })),
    postal_code: faker.string.numeric(5),
    city: faker.location.city(),
    state: faker.location.state(),
    country: 'US',
  },
  ...overrides,
})

export interface BillingAddressPayload {
  street: string
  house_number: string
  postal_code: string
  city: string
  state: string
  country: string
}

export const anAddress = (overrides: Partial<BillingAddressPayload> = {}): BillingAddressPayload => ({
  street: faker.location.street(),
  house_number: String(faker.number.int({ min: 1, max: 999 })),
  postal_code: faker.string.numeric(5),
  city: faker.location.city(),
  state: faker.location.state(),
  country: 'US',
  ...overrides,
})
