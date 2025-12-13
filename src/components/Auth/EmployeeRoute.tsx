import { useAuth } from '../../auth/AuthContext.tsx';
import { Navigate, Outlet } from 'react-router-dom';

function EmployeeRoute() {
  const { isOwner, isEmployee, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isEmployee) {
    if (isOwner) {
      return <Navigate to="/owner-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
export default EmployeeRoute;
