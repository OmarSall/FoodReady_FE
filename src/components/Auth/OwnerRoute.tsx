import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes.ts';

function OwnerRoute() {
  const { isEmployee, isOwner, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isOwner) {
    return <Outlet />;
  }

  if (isEmployee) {
    return <Navigate to={ROUTES.ORDERS} replace />;
  }

  return <Navigate to={ROUTES.HOME} replace />;
}

export default OwnerRoute;
