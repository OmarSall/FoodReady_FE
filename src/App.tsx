import { Routes, Route } from "react-router-dom";
import GuestRoute from "./components/Auth/GuestRoute.tsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.tsx";
import OwnerRoute from "./components/Auth/OwnerRoute.tsx";
import EmployeeRoute from "./components/Auth/EmployeeRoute.tsx";

import WelcomePage from "./components/WelcomePage/WelcomePage.tsx";
import LoginPage from "./components/Auth/LoginPage/LoginPage.tsx";
import CompanyRegistrationPage from "./components/CompaniesPage/CompaniesPage.tsx";
import OwnerDashboardPage from "./components/OwnerDashboard/OwnerDashboardPage.tsx";
import EmployeeDashboardPage from "./components/EmployeeDashboardPage/EmployeeDashboardPage.tsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.tsx";

function App() {
  return (
    <Routes>
      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
      </Route>

      {/* Authenticated routes */}
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

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;