import { API_BASE_URL } from '../constants/api.ts';
import { ApiError, getErrorMessage, getErrorMetadata } from './api-error.ts';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  body?: unknown;
}

const parseBody = (response: Response) => {
  if (response.headers.get('content-type')?.includes('application/json')) {
    return response.json();
  }
  return null;
};

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

  const parsedBody = await parseBody(response);

  if (!response.ok) {
    const errorMessage = getErrorMessage(parsedBody);
    const { statusCode, rawMessage } = getErrorMetadata(
      parsedBody,
      response.status,
    );
    throw new ApiError(errorMessage, statusCode, rawMessage);
  }

  return parsedBody as TResponse;
}
