import { request } from '../http/request.ts';

export interface CreateEmployeePayload {
  name: string;
  email: string;
  position: 'EMPLOYEE';
}

export interface EmployeeResponse {
  name: string;
  email: string;
  position: 'EMPLOYEE';
}

export async function createEmployee(
  payload: CreateEmployeePayload,
): Promise<EmployeeResponse> {
  return request<EmployeeResponse>('POST', '/employees', {
    body: payload,
  });
}
