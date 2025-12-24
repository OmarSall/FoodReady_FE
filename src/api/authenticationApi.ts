import { request } from '../http/request';
import type { AuthenticatedUser } from '../auth/auth-types';

export interface LogInPayload {
  email: string;
  password: string;
}

export async function logIn(payload: LogInPayload): Promise<AuthenticatedUser> {
  return request<AuthenticatedUser>('POST', '/authentication/log-in', {
    body: payload,
  });
}

export function logOut(): Promise<void> {
  return request('POST', '/authentication/log-out');
}

export function getCurrentUser(): Promise<AuthenticatedUser> {
  return request<AuthenticatedUser>('GET', '/authentication');
}
