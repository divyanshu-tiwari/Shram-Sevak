import './App.css';
import HomePage from './customer/components/Pages/HomePage/HomePage';
import Navigation from './customer/components/navigation/Navigation';
import FormWorker from './Worker/components/Login&Registration/FormWorker'
import FormCustomer from './customer/components/Login&Registration/FormCustomer'
import { Routes,Route} from "react-router-dom";
import ChooseLogin from './customer/components/Pages/HomePage/ChooseLogin/ChooseLogin';
import ChooseSkills from './Worker/components/Login&Registration/ChooseSkills';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ChooseLogin />} />
        <Route path="/loginCustomer" element={<FormCustomer />} />
        <Route path="/loginWorker" element={<FormWorker />} />
        <Route path="/chooseskills" element={<ChooseSkills />} />

      </Routes>
    </>
  );
}

export default App;
