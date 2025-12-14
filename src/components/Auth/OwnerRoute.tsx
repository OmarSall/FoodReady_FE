import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.tsx';

function OwnerRoute() {
  const { isEmployee, isOwner, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isOwner) {
    if (isEmployee) {
      return <Navigate to="/employee-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />
}

export default OwnerRoute;
