import { request } from '../http/request.ts';

export function logOut() {
  return request('POST', '/authentication/log-out');
}
