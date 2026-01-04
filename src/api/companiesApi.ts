import { request } from '../http/request';
import { API_ENDPOINTS } from '../constants/api';
import type { AuthenticatedUser } from '../auth/authTypes';
type Role = AuthenticatedUser['position'];

export interface RegisterCompanyPayload {
  companyName: string;
  email: string;
  password: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface CompanyOwner {
  id: number;
  email: string;
  name: string;
  position: Role;
  companyId: number;
}

export interface RegisterCompanyResponse {
  company: Company;
  owner: CompanyOwner;
}

export function registerCompany(
  payload: RegisterCompanyPayload,
): Promise<RegisterCompanyResponse> {
  return request<RegisterCompanyResponse>(
    'POST',
    API_ENDPOINTS.COMPANIES.REGISTER,
    { body: payload },
  );
}
