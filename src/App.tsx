import './App.css'
import { Routes, Route } from "react-router-dom";
import CompanyRegistrationPage from './pages/company/CompanyRegistrationPage.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
      </Routes>
    </>
  )
}

export default App
