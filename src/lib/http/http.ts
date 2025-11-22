import { request } from './request.ts';


export const http = {
  get: <TResponse>(path: string) => request<TResponse>('GET', path),
  post: <TResponse>(path: string, body?: unknown) =>
    request<TResponse>('POST', path, { body }),
  patch: <TResponse>(path: string, body?: unknown) =>
    request<TResponse>('PATCH', path, { body }),
  delete: <TResponse>(path: string) => request<TResponse>('DELETE', path),
};
