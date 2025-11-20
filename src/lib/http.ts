import { API_BASE_URL } from '../constants/api';

export interface ApiErrorResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export class ApiError extends Error {
  statusCode?: number;
  backendError?: string;

  constructor(message: string, statusCode?: number, backendError?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.backendError = backendError;
  }
}

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  body?: unknown;
}

async function request<TResponse>(
  method: HttpMethod,
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const url = API_BASE_URL + path;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let parsedBody: unknown = null;

  try {
    parsedBody = await response.json();
  } catch {}

  if (!response.ok) {
    const errorData = parsedBody as ApiErrorResponse | null;

    let message = 'Unexpected server error';

    if (errorData?.message) {
      if (Array.isArray(errorData.message)) {
        message = errorData.message.join(', ');
      } else {
        message = errorData.message;
      }
    }
    throw new ApiError(message, errorData?.statusCode, errorData?.error);
  }

  return parsedBody as TResponse;
}

export const http = {
  get: <TResponse>(path: string) => request<TResponse>('GET', path),
  post: <TResponse>(path: string, body?: unknown) =>
    request<TResponse>('POST', path, { body }),
  patch: <TResponse>(path: string, body?: unknown) =>
    request<TResponse>('PATCH', path, { body }),
  delete: <TResponse>(path: string) => request<TResponse>('DELETE', path),
};
