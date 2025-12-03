import './App.css';
import { Routes, Route } from 'react-router-dom';
import CompanyRegistrationPage from './components/CompaniesPage/CompanyRegistrationPage/CompanyRegistrationPage';
import WelcomePage from './components/WelcomePage/WelcomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
