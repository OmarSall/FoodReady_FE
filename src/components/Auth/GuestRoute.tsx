import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/orders" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
