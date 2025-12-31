import { API_BASE_URL } from '../constants/api';
import { ApiError, getErrorMessage, getErrorMetadata } from './api-error';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  body?: unknown;
}

const parseBody = async (response: Response) => {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return undefined;
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
    credentials: 'include',
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
