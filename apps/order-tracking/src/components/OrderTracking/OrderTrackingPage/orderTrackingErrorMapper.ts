import { ApiError } from '@foodready/shared';
import { type OrderTrackingErrorViewState, ViewStateKind } from './orderTrackingViewState';


export function mapOrderTrackingError(
  error: unknown,
): OrderTrackingErrorViewState {
  if (error instanceof ApiError && error.statusCode === 404) {
    return {
      kind: ViewStateKind.ERROR,
      message: 'Invalid or expired tracking link.',
      canRetry: false,
    };
  }

  if (error instanceof ApiError && error.statusCode === 410) {
    return {
      kind: ViewStateKind.ERROR,
      message: 'Tracking link has expired.',
      canRetry: false,
    };
  }

  if (error instanceof Error) {
    return {
      kind: ViewStateKind.ERROR,
      message: error.message,
      canRetry: true,
    };
  }

  return {
    kind: ViewStateKind.ERROR,
    message: 'Could not load tracking status.',
    canRetry: true,
  };
}
