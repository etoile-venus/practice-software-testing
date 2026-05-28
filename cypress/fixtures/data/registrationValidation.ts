export interface FieldErrorCase {
  dataTest: string
  message: string
}

export const registrationRequiredFieldErrors: FieldErrorCase[] = [
  { dataTest: 'first-name-error', message: 'First name is required' },
  { dataTest: 'last-name-error', message: 'Last name is required' },
  { dataTest: 'dob-error', message: 'Date of Birth is required' },
  { dataTest: 'country-error', message: 'Country is required' },
  { dataTest: 'postal_code-error', message: 'Postcode is required' },
  { dataTest: 'house_number-error', message: 'House number is required' },
  { dataTest: 'street-error', message: 'Street is required' },
  { dataTest: 'city-error', message: 'City is required' },
  { dataTest: 'state-error', message: 'State is required' },
  { dataTest: 'phone-error', message: 'Phone is required.' },
  { dataTest: 'email-error', message: 'Email is required' },
  { dataTest: 'password-error', message: 'Password is required' },
]
