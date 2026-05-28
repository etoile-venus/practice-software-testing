export const Routes = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  forgot: '/auth/forgot-password',
  account: '/account',
  product: (id: string) => `/product/${id}`,
  checkout: '/checkout',
  contact: '/contact',
  categories: '/categories',
} as const

export type Route = typeof Routes
