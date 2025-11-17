import { ENDPOINTS} from "../constants/api.ts";
import { http } from "../lib/http";

export interface RegisterCompanyPayload {
    companyName: string;
    email: string;
    password: string;
    slugUrl?: string;
}

export interface Company {
    id: number;
    name: string;
    slugUrl: string;
}

export interface Employee {
    id: number;
    email: string;
    name: string;      // "OWNER"
    position: string;  // "OWNER"
    companyId: number;
}

export interface RegisterCompanyResponse {
    company: Company;
    owner: Employee;
}

export function registerCompany(
    payload: RegisterCompanyPayload,
) : Promise<RegisterCompanyResponse> {
    return http.post<RegisterCompanyResponse>(
        ENDPOINTS.COMPANIES.REGISTER,
        payload
    )
}