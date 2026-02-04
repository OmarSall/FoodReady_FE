import { API_BASE_URL } from '../constants/api';
import { ApiError, getErrorMessage } from '@foodready/shared';
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

export async function request<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(API_BASE_URL + path);

  const parsedBody = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(parsedBody), response.status);
  }

  return parsedBody as TResponse;
}
