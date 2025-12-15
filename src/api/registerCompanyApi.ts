import { request } from '../http/request';

export interface RegisterCompanyPayload {
  companyName: string;
  email: string;
  password: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  email: string;
  name: string;
  position: string;
  companyId: number;
}

export interface RegisterCompanyResponse {
  company: Company;
  owner: Employee;
}

export function registerCompany(
  payload: RegisterCompanyPayload,
): Promise<RegisterCompanyResponse> {
  return request<RegisterCompanyResponse>('POST', '/companies/register', {
    body: payload,
  });
}
