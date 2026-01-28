import { request } from '../http/request';
import { API_ENDPOINTS, API_PATHS } from '../constants/api';

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: number;
  title: string;
  description?: string | null;
  status: OrderStatus;
  trackingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

interface CreateOrderPayload {
  title: string;
  description?: string;
}

export function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return request<Order>('POST', API_ENDPOINTS.ORDERS, { body: payload });
}

export function getOrders(): Promise<Order[]> {
  return request<Order[]>('GET', API_ENDPOINTS.ORDERS);
}

export function updateOrderStatus(
  id: number,
  payload: UpdateOrderStatusPayload,
): Promise<Order> {
  return request<Order>('PATCH', API_PATHS.orderById(id), { body: payload });
}
