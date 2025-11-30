import './App.css';
import { Routes, Route } from 'react-router-dom';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';
import WelcomePage from './components/WelcomePage/WelcomePage.tsx';
import LoginPage from './components/Auth/LoginPage/LoginPage.tsx';
import OwnerDashboardPage from './components/OwnerDashboard/OwnerDashboardPage.tsx';
import OwnerRoute from './components/Auth/OwnerRoute.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <OwnerDashboardPage />
            </OwnerRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
