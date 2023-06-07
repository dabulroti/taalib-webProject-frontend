import logo from './logo.svg';
import './App.css';
import LoginForm from './Pages/login';
import MainPage from './Components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter,Routes } from "react-router-dom";
import Disperse from './Pages/disperse';
import PayFee from './Pages/payFee';
import Challan from './Pages/generateChallan';
import Home from './Pages/homepage';


function App() {
  return (
    <>
    {/* <Routes>
      <Route exact path="/Home" element={<MainPage/>} /> 
    </Routes> */}

    <Routes>
      <Route exact path="/login" element={<LoginForm/>} />
      <Route exact path="/" element={<MainPage/>}>
        <Route exact path="" element={<Home/>} />
        <Route exact path="disperse" element={<Disperse/>} />
        <Route exact path="payFee" element={<PayFee/>} />
        <Route exact path="generateChallan" element={<Challan/>} />
      </Route>
    </Routes>

    {/* <LoginForm/> */}
    </>
  );
}

export default App;
