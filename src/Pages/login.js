import React, { useState,useNavigate } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";
import axios from "axios";

const LoginForm = () => {
  const [employeeId, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      employeeId,
      password,
    };
    
    axios
      .post("https://taalib-accountofficer-api.onrender.com/accountOffice/login", data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password");
      });
  };

  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login - Taalib</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="employeeId">Employee ID:</label>
                  <input
                    type="text"
                    placeholder="Enter your ID"
                    className="form-control"
                    value={employeeId}
                    onChange={handleIdChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
