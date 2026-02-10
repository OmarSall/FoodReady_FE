import { API_PATHS } from '../constants/api';
import { request } from '../http/request';

export enum PublicOrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

const STATUS_PROGRESS: Record<PublicOrderStatus, number | null> = {
  [PublicOrderStatus.PENDING]: 0,
  [PublicOrderStatus.IN_PROGRESS]: 1,
  [PublicOrderStatus.COMPLETED]: 2,
  [PublicOrderStatus.CANCELLED]: null,
} as const;

export function getProgressIndex(status: PublicOrderStatus): number | null {
  return STATUS_PROGRESS[status];
}

export function isFinalPublicStatus(status: PublicOrderStatus) {
  return (
    status === PublicOrderStatus.COMPLETED ||
    status === PublicOrderStatus.CANCELLED
  );
}

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
