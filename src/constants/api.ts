export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTHENTICATION: {
    LOGIN: '/authentication/log-in',
    LOGOUT: '/authentication/log-out',
    CURRENT_USER: '/authentication',
  },
  ORDERS: '/orders',
  EMPLOYEES: '/employees',
  COMPANIES: {
    REGISTER: '/companies/register',
  },
} as const;

export const apiPaths = {
  orderById: (id: number) => `${API_ENDPOINTS.ORDERS}/${id}`,
} as const;
