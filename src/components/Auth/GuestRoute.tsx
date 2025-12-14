import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.tsx';


function GuestRoute() {
  const { isAuthenticated, isLoading, isOwner, isEmployee } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && isOwner) {
    return <Navigate to="/owner-dashboard" replace />;
  }

  if (isAuthenticated && isEmployee) {
    return <Navigate to="/employee-dashboard" replace />;
  }
  return <Outlet />
}

export default GuestRoute;