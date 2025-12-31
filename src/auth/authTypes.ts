export type Role = 'OWNER' | 'EMPLOYEE';

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  position: Role;
  companyId: number;
  company?: {
    id: number;
    name: string;
  };
}
