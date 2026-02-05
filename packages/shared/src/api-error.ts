interface ApiErrorResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export class ApiError extends Error {
  statusCode?: number;
  rawMessage?: string;

  constructor(message: string, statusCode?: number, rawMessage?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.rawMessage = rawMessage;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!isRecord(value)) {
    return false;
  }

  const hasMessage =
    'message' in value &&
    (typeof value.message === 'string' || Array.isArray(value.message));

  const hasStatusCode =
    'statusCode' in value && typeof value.statusCode === 'number';

  const hasError = 'error' in value && typeof value.error === 'string';

  return hasMessage || (hasError && hasStatusCode);
}

export function getErrorMessage(parsedBody: unknown): string {
  if (!isApiErrorResponse(parsedBody)) {
    return 'Unexpected server error';
  }

  if (Array.isArray(parsedBody.message)) {
    return parsedBody.message.join(', ');
  }

  return parsedBody.message ?? 'Unexpected server error';
}

export function getErrorMetadata(
  parsedBody: unknown,
  fallbackStatusCode: number,
): {
  statusCode: number;
  rawMessage?: string;
} {
  if (!isApiErrorResponse(parsedBody)) {
    return { statusCode: fallbackStatusCode, rawMessage: undefined };
  }

  const statusCode =
    typeof parsedBody.statusCode === 'number'
      ? parsedBody.statusCode
      : fallbackStatusCode;

  return {
    statusCode,
    rawMessage: parsedBody.error,
  };
}
