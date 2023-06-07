import React from "react";
import { BrowserRouter as Router, Route, Switch,Routes,Link } from "react-router-dom";
import { createRoot } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../Styles/components.css';
import Disperse from "../Pages/disperse";
import PayFee from "../Pages/payFee";
import Challan from "../Pages/generateChallan";
import LoginForm from "../Pages/login";
import '../Styles/nav.css'
// import '../Resources/logout.png'
import Home from "../Pages/homepage";


const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
}

function Components(){

    return(
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand logo" href="#">Taalib</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* <a className="nav-link" href="#">Home</a> */}
          <img className="logout-image" src="/Resources/logout.png" onClick={()=>{logout()}}/>
        </li>
      </ul>
    </div>
  </div>
</nav>


<div className="container-fluid">
  <div className="row">
    <div className="col-md-2 bg-dark">
      <div className="sidebar vh-100">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/disperse" className="nav-link sidebarli" >Disperse Salaries</Link>
          </li>
          <li className="nav-item">
            <Link to="/generateChallan" className="nav-link sidebarli" >Generate Challan</Link>
          </li>
          <li className="nav-item ">
            <Link to="/payFee" className="nav-link sidebarli" >Pay Fee</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="col-md-10">
      <div className="main-content p-5">
        
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/disperse" element={<Disperse/>} />
      <Route exact path="/payFee" element={<PayFee/>} />
      <Route exact path="/generateChallan" element={<Challan/>} />
      <Route exact path="/login" element={<LoginForm/>} />  
    </Routes>

      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Components;