import { request } from '../http/request';

export function logOut(): Promise<void> {
  return request('POST', '/authentication/log-out');
}
