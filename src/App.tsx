import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/register-company" replace />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
