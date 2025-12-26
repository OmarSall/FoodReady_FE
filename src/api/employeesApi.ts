import { request } from '../http/request';
import { API_ENDPOINTS } from '../constants/api';
import type { AuthenticatedUser } from '../auth/auth-types';

type Role = AuthenticatedUser['position'];

export interface CreateEmployeePayload {
  name: string;
  email: string;
  position: 'EMPLOYEE';
}

export interface EmployeeResponse {
  id: number;
  name: string;
  email: string;
  position: Role;
  companyId: number;
}

export function createEmployee(
  payload: CreateEmployeePayload,
): Promise<EmployeeResponse> {
  return request<EmployeeResponse>('POST', API_ENDPOINTS.EMPLOYEES, {
    body: payload,
  });
}
