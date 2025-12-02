import type { ReactNode } from 'react';
import { useAuth } from '../../auth/AuthContext.tsx';
import { Navigate } from 'react-router-dom';

interface EmployeeRouteProps {
  children: ReactNode;
}

function EmployeeRoute({ children }: EmployeeRouteProps) {
  const { isAuthenticated, isEmployee, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isEmployee) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
export default EmployeeRoute;
