import './App.css';
import HomePage from './customer/components/Pages/HomePage/HomePage';
import Navigation from './customer/components/navigation/Navigation';
import FormWorker from './Worker/components/Login&Registration/FormWorker'
import FormCustomer from './customer/components/Login&Registration/FormCustomer'
import { Routes,Route} from "react-router-dom";

import AdminContainer from "./admin/components/AdminContainer"

import ChooseLogin from './customer/components/Pages/HomePage/ChooseLogin/ChooseLogin';
import AdminDashboard from './admin/components/AdminDashboard';


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginCustomer" element={<FormCustomer />} />
        <Route path="/loginWorker" element={<FormWorker />} />

        <Route path="/admin" element={<AdminContainer />} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />

        <Route path="/login" element={<ChooseLogin />} />

      </Routes>
    </>
  );
}

export default App;
