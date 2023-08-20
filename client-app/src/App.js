import './App.css';
import HomePage from './customer/components/Pages/HomePage/HomePage';
import Navigation from './customer/components/navigation/Navigation';

function App() {
  return (
    <div className="">
     <div>
      <Navigation/>
     </div>
     <div>
      <HomePage/>
     </div>
    </div>
  );
}

export default App;
