import { Routes, Route } from 'react-router-dom';
import GuestRoute from './components/Auth/GuestRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import OwnerRoute from './components/Auth/OwnerRoute';
import WelcomePage from './components/WelcomePage/WelcomePage';
import LoginPage from './components/Auth/LoginPage/LoginPage';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import OrdersPage from './components/Orders/OrdersPage';
import EmployeesPage from './components/Employees/EmployeesPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.HOME} element={<WelcomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.REGISTER_COMPANY}
          element={<CompanyRegistrationPage />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
          <Route element={<OwnerRoute />}>
            <Route path={ROUTES.EMPLOYEES} element={<EmployeesPage />} />
          </Route>
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
