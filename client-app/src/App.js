import './App.css';
import HomePage from './customer/components/Pages/HomePage/HomePage';
import Navigation from './customer/components/navigation/Navigation';
import FormWorker from './Worker/components/Login&Registration/FormWorker'
import FormCustomer from './customer/components/Login&Registration/FormCustomer'
import { Routes, Route } from "react-router-dom";

import AdminContainer from "./admin/components/AdminContainer"

import ChooseLogin from './customer/components/Pages/HomePage/ChooseLogin/ChooseLogin';
import AdminDashboard from './admin/components/AdminDashboard';
import { Unauthorized } from './pages/unauthorized.page';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginCustomer" element={<FormCustomer />} />
        <Route path="/loginWorker" element={<FormWorker />} />

        <Route path="/admin" element={<AdminContainer />} />

        <Route path='/admin-dashboard' element={
          <AuthGuard roles={[Role.ADMIN]}>
            <AdminDashboard />
          </AuthGuard>
        } />

        <Route path="/login" element={<ChooseLogin />} />

        <Route path="/401" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
