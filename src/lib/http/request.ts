import { API_BASE_URL } from '../../constants/api.ts';
import { ApiError, getErrorMessage, getErrorMetadata } from './api-error.ts';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  body?: unknown;
}

export async function request<TResponse>(
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
  } catch {
    if (response.status !== 204) {
      throw new ApiError(
        'Failed to parse JSON response from server',
        response.status,
        'Invalid JSON',
      );
    }
  }

  if (!response.ok) {
    const message = getErrorMessage(parsedBody);
    const { statusCode, backendError } = getErrorMetadata(
      parsedBody,
      response.status,
    );
    throw new ApiError(message, statusCode, backendError);
  }

  return parsedBody as TResponse;
}