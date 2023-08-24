import './App.css';
import HomePage from './customer/components/Pages/HomePage/HomePage';
import Navigation from './customer/components/navigation/Navigation';
import FormWorker from './Worker/components/Login&Registration/FormWorker'
import FormCustomer from './customer/components/Login&Registration/FormCustomer'
import Routing from './RoutingSignIn-SignUp/Routing'
import { Routes,Route} from "react-router-dom";
import AdminContainer from "./admin/components/AdminContainer"

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginCustomer" element={<FormCustomer />} />
        <Route path="/loginWorker" element={<FormWorker />} />
        <Route path="/login" element={<Routing />} />
        <Route path="/admin" element={<AdminContainer />} />
      </Routes>
    </>
  );
}

export default App;
