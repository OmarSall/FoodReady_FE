import { ApiError } from "@foodready/shared";

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isUnauthorized(error: unknown): error is ApiError {
  return isApiError(error) && error.statusCode === 401;
}
