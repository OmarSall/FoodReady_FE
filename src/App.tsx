import './App.css';
import { Routes, Route } from 'react-router-dom';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';
import WelcomePage from './components/WelcomePage/WelcomePage.tsx';
import LoginPage from './components/Auth/LoginPage/LoginPage.tsx';
import OwnerDashboardPage from './components/OwnerDashboard/OwnerDashboardPage.tsx';
import OwnerRoute from './components/Auth/OwnerRoute.tsx';
import EmployeeDashboardPage from './components/EmployeeDashboardPage/EmployeeDashboardPage.tsx';
import EmployeeRoute from './components/Auth/EmployeeRoute.tsx';
import GuestRoute from './components/Auth/GuestRoute.tsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.tsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.tsx';



function App() {
  return (
    <>
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
            <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
