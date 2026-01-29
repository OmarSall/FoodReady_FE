export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTHENTICATION: {
    LOGIN: '/authentication/log-in',
    LOGOUT: '/authentication/log-out',
    CURRENT_USER: '/authentication',
  },
  ORDERS: '/orders',
  ORDER_TRACKING: '/order-tracking',
  EMPLOYEES: '/employees',
  COMPANIES: {
    REGISTER: '/companies/register',
  },
} as const;

export const API_PATHS = {
  orderById: (id: number) => `${API_ENDPOINTS.ORDERS}/${id}`,
  orderTrackingById: (trackingId: string) =>
    `${API_ENDPOINTS.ORDER_TRACKING}/${trackingId}`,
} as const;
