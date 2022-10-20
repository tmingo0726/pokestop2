import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "../stylesheets/Login.css";

// require("dotenv").config();
// const path = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/api";

const Login = ({
  setToken,
  loggedIn,
  setLoggedIn,
  username,
  setUsername,
  password,
  setPassword,
  setIsadmin,
}) => {
  
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/customers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("RESULT", result);
        setLoggedIn(true);
        setToken(result.token);
        setIsadmin(result.customer.admin);
        localStorage.setItem("token", result.token);
        localStorage.setItem("admin", result.customer.admin);
        localStorage.setItem("username", result.customer.username);
      } else {
        setError(result.error);
        console.log("RESULT ERROR", result.error);
        setErrorMessage(result.message);
        setLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
      setLoggedIn(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password);
  };

  return (
    <div>
      <form id="login" className="form" onSubmit={handleSubmit}>
        {loggedIn ? (
          <Navigate to="/" />
        ) : (
          <>
            <h2 className="form-header">Login</h2>
            <hr className="form-divider"></hr>
            <div className="input-wrapper">
              <input
                type="text"
                id="login-username"
                className="form-inputs"
                placeholder="Username"
                required
                minLength={5}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
              <input
                id="login-password"
                className="form-inputs"
                placeholder="Password"
                required
                type="password"
                minLength={8}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
            <div className="error">
              <h4>{error && `${errorMessage}`}</h4>
            </div>
            <div>
              <button className="form-btn" type="submit">
                Login
              </button>
              <div className="form-redirect-text">
                Not a member?{" "}
                <Link className="form-redirect-link" to="/register">
                  Sign Up!
                </Link>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
