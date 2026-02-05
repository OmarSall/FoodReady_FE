import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { ROUTES } from '../../constants/routes.ts';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
