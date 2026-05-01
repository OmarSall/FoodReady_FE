export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER_COMPANY: '/register-company',
  ORDERS: '/orders',
  EMPLOYEES: '/employees',
  TRACK_ORDER: '/order-tracking/:trackingId',
  SET_PASSWORD: '/set-password',
  NOT_FOUND: '*',
} as const;
