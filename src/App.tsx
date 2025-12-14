import { Routes, Route } from 'react-router-dom';
import GuestRoute from './components/Auth/GuestRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import OwnerRoute from './components/Auth/OwnerRoute';
import EmployeeRoute from './components/Auth/EmployeeRoute';

import WelcomePage from './components/WelcomePage/WelcomePage';
import LoginPage from './components/Auth/LoginPage/LoginPage';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';
import OwnerDashboardPage from './components/OwnerDashboard/OwnerDashboardPage';
import EmployeeDashboardPage from './components/EmployeeDashboardPage/EmployeeDashboardPage';
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
        <Route element={<OwnerRoute />}>
          <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
        </Route>

        <Route element={<EmployeeRoute />}>
          <Route
            path="/employee-dashboard"
            element={<EmployeeDashboardPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
