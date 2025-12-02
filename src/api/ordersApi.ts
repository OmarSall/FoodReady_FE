import { request } from '../http/request.ts';

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: number;
  title: string;
  description?: string | null;
  status: OrderStatus;
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

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return request<Order>('POST', '/orders', { body: payload });
}

export async function getOrders(): Promise<Order[]> {
  return request<Order[]>('GET', `/orders`);
}

export async function updateOrderStatus(
  id: number,
  payload: UpdateOrderStatusPayload,
): Promise<void> {
  return request('PATCH', `/orders/${id}`, { body: payload });
}
