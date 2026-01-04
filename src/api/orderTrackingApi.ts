import { API_PATHS } from '../constants/api';
import { request } from '../http/request';
import { ApiError } from '../http/api-error';

export type PublicOrderStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type OrderTrackingResponse = {
  status: PublicOrderStatus;
  updatedAt: string;
};

const USE_MOCK = import.meta.env.VITE_MOCK_ORDER_TRACKING === 'true';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getOrderTrackingStatus(
  trackingId: string,
): Promise<OrderTrackingResponse> {
  if (USE_MOCK) {
    await sleep(500); // mocking network latency

    if (trackingId === '404') {
      throw new ApiError('Invalid or expired tracking link', 404, 'Not found');
    }

    const map: Record<string, PublicOrderStatus> = {
      pending: 'PENDING',
      progress: 'IN_PROGRESS',
      completed: 'COMPLETED',
      cancelled: 'CANCELLED',
    };

    return {
      status: map[trackingId] ?? 'PENDING',
      updatedAt: new Date().toISOString(),
    };
  }

  return request<OrderTrackingResponse>(
    'GET',
    API_PATHS.orderTrackingById(trackingId),
  );
}
