export interface InvalidEmailCase {
  value: string
  reason: string
}

export const loginInvalidEmails: InvalidEmailCase[] = [
  { value: 'invalid-email', reason: 'no @ symbol' },
  { value: 'email@example', reason: 'missing top-level domain' },
  { value: 'email..email@example.com', reason: 'consecutive dots in local part' },
]

export const registrationInvalidEmails: InvalidEmailCase[] = [
  { value: 'plainaddress', reason: 'no @ symbol' },
  { value: '@example.com', reason: 'missing local part' },
  { value: 'email@example', reason: 'missing top-level domain' },
  { value: 'email@example@example.com', reason: 'multiple @ symbols' },
]
