import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function OwnerRoute() {
  const { isEmployee, isOwner, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isOwner || isAdmin) {
    return <Outlet />;
  }

  if (isEmployee) {
    return <Navigate to="/orders" replace />;
  }

  return <Navigate to="/" replace />;
}

export default OwnerRoute;
