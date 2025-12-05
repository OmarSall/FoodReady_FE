import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.tsx';

interface OwnerRouteProps {
  children: ReactNode;
}

function OwnerRoute({ children }: OwnerRouteProps) {
  const { isAuthenticated, isOwner, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isOwner) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
export default OwnerRoute;
