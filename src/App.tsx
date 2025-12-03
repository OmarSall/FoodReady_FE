import './App.css';
import { Routes, Route } from 'react-router-dom';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import LoginPage from './components/Auth/LoginPage/LoginPage';
import GuestRoute from './components/Auth/GuestRoute.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/register-company"
          element={
            <GuestRoute>
              <CompanyRegistrationPage />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
