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

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/orders" element={<OrdersPage />} />
          <Route element={<OwnerRoute />}>
            <Route path="/employees" element={<EmployeesPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
