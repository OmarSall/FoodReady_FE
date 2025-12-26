import { request } from '../http/request';
import type { AuthenticatedUser } from '../auth/auth-types';
import { API_ENDPOINTS } from '../constants/api';

export interface LogInPayload {
  email: string;
  password: string;
}

export function logIn(payload: LogInPayload): Promise<AuthenticatedUser> {
  return request<AuthenticatedUser>(
    'POST',
    API_ENDPOINTS.AUTHENTICATION.LOGIN,
    { body: payload },
  );
}

export function logOut(): Promise<void> {
  return request('POST', API_ENDPOINTS.AUTHENTICATION.LOGOUT);
}

export function getCurrentUser(): Promise<AuthenticatedUser> {
  return request<AuthenticatedUser>(
    'GET',
    API_ENDPOINTS.AUTHENTICATION.CURRENT_USER,
  );
}
