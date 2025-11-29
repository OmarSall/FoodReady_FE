import type { AuthenticatedUser } from '../auth/auth-types.ts';
import { request } from '../http/request.ts';

export interface LogInPayload {
  email: string;
  password: string;
}

export async function logIn(payload: LogInPayload): Promise<AuthenticatedUser> {
  return request<AuthenticatedUser>('POST', '/authentication/log-in', {
    body: payload,
  });
}
