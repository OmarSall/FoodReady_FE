import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes.ts';

function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ORDERS} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
