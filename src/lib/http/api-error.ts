import type { ApiErrorResponse } from './api-error.types.ts';

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

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;

  const hasMessage =
    'message' in obj &&
    (typeof obj.message === 'string' || Array.isArray(obj.message));

  const hasStatusCode =
    'statusCode' in obj && typeof obj.statusCode === 'number';

  const hasError = 'error' in obj && typeof obj.error === 'string';

  return hasMessage || (hasError && hasStatusCode);
}

export function getErrorMessage(parsedBody: unknown): string {
  if (!isApiErrorResponse(parsedBody)) {
    return 'Unexpected server error';
  }

  const apiError = parsedBody;

  if (Array.isArray(apiError.message)) {
    return apiError.message.join(', ');
  }

  return apiError.message ?? 'Unexpected server error';
}

export function getErrorMetadata(
  parsedBody: unknown,
  fallbackStatusCode: number,
): {
  statusCode: number;
  backendError?: string;
} {
  if (!isApiErrorResponse(parsedBody)) {
    return { statusCode: fallbackStatusCode, backendError: undefined };
  }

  const apiError = parsedBody;

  const statusCode =
    typeof apiError.statusCode === 'number'
      ? apiError.statusCode
      : fallbackStatusCode;

  return {
    statusCode,
    backendError: apiError.error,
  };
}
