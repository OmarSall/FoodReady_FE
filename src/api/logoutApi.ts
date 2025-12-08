import { request } from '../http/request.ts';

export function logOut(): Promise<void> {
  return request('POST', '/authentication/log-out');
}
