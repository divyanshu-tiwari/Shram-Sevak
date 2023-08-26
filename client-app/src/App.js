import './App.css';
import HomePage from './customer/components/Pages/HomePage/HomePage';
import Navigation from './customer/components/navigation/Navigation';
import FormWorker from './Worker/components/Login&Registration/FormWorker'
import FormCustomer from './customer/components/Login&Registration/FormCustomer'
import { Routes, Route } from "react-router-dom";

import { AdminLogin } from "./admin/pages/admin.login"

import ChooseLogin from './customer/components/Pages/HomePage/ChooseLogin/ChooseLogin';

import ChooseSkills from './Worker/components/Login&Registration/ChooseSkills';

import AdminDashboard from './admin/pages/AdminDashboard';
import { Unauthorized } from './pages/unauthorized.page';
import { AdminAuthGuard } from './utils/guards/admin.auth.guard';
import { AdminLoginGuard } from './utils/guards/admin.login.guard';
import { Role } from './utils/models/role';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ChooseLogin />} />
        <Route path="/loginCustomer" element={<FormCustomer />} />
        <Route path="/loginWorker" element={<FormWorker />} />
        <Route path="/chooseskills" element={<ChooseSkills />} />
  
        <Route path="/admin" element={
        // <AdminLoginGuard roles={[Role.ADMIN]}>
          <AdminLogin />
        // </AdminLoginGuard>
        } />

      <Route path='/admin-dashboard' element={
        // <AdminAuthGuard roles={[Role.ADMIN]}>
          <AdminDashboard />
        // </AdminAuthGuard>
      } />

      <Route path="/login" element={<ChooseLogin />} />

      <Route path="/401" element={<Unauthorized />} />
    </Routes >

    </>
  );
}

export default App;
