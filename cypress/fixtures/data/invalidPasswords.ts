export interface InvalidPasswordCase {
  value: string
  reason: string
  expectedError: RegExp
}

export const lengthBoundaryPasswords: InvalidPasswordCase[] = [
  {
    value: 'A1!bc',
    reason: '5 chars (below minimum of 6)',
    expectedError: /password must be minimal 6 characters long/i,
  },
]

export const characterTypePasswords: InvalidPasswordCase[] = [
  { value: 'lowercase7!', reason: 'no uppercase letter', expectedError: /uppercase/i },
  { value: 'UPPERCASE7!', reason: 'no lowercase letter', expectedError: /lowercase/i },
  { value: 'NoNumber!', reason: 'no number', expectedError: /number/i },
  { value: 'NoSymbol7', reason: 'no special character', expectedError: /symbol|special/i },
]
