import { useState } from "react";
import { Navigate } from "react-router-dom";

// require("dotenv").config();
// const path = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/api";

const Login = ({
  loggedIn,
  setLoggedIn,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //   const [loggedIn, setLoggedIn] = useState(false);

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
      console.log("RESULT", result);
      setError(result.error);
      setErrorMessage(result.message);
      {
        result.token ? localStorage.setItem("token", result.token) : null;
      }
      setLoggedIn(result.token);
      return result.token;
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
      <form id="login" onSubmit={handleSubmit}>
        {loggedIn ? (
          <Navigate to="/" />
        ) : (
          <>
            <h2>Login</h2>
            <div>
              <input
                value={username}
                placeholder="Please enter username"
                required
                minLength={5}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={password}
                placeholder="Please enter password"
                required
                type="password"
                minLength={8}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
            <div id="error">
              <h2>{error ? `${errorMessage}` : null}</h2>
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
