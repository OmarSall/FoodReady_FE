import { ApiError } from "@foodready/shared";

export type OrderTrackingErrorViewState = {
  kind: 'error';
  message: string;
  canRetry: boolean;
};

export function mapOrderTrackingError(
  error: unknown,
): OrderTrackingErrorViewState {
  if (error instanceof ApiError && error.statusCode === 404) {
    return {
      kind: 'error',
      message: 'Invalid or expired tracking link.',
      canRetry: false,
    };
  }

  if (error instanceof ApiError && error.statusCode === 410) {
    return {
      kind: 'error',
      message: 'Tracking link has expired.',
      canRetry: false,
    };
  }

  if (error instanceof Error) {
    return {
      kind: 'error',
      message: error.message,
      canRetry: true,
    };
  }

  return {
    kind: 'error',
    message: 'Could not load tracking status.',
    canRetry: true,
  };
}
