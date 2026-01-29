import { API_PATHS } from '../constants/api';
import { request } from '../http/request';

export type PublicOrderStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type OrderTrackingResponse = {
  status: PublicOrderStatus;
  updatedAt: string;
};

export async function getOrderTrackingStatus(
  trackingId: string,
): Promise<OrderTrackingResponse> {
  return request<OrderTrackingResponse>(
    API_PATHS.orderTrackingById(trackingId),
  );
}
