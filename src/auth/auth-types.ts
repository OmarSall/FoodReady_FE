export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  position: 'OWNER' | 'EMPLOYEE';
  companyId: number;
  company?: {
    id: number;
    name: string;
  };
}
