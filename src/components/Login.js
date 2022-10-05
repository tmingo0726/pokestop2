import { useState } from "react";

// require("dotenv").config();
// const path = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/api";

const Login = () => {
  const loginUser = async () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

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
        return result.token;
      } catch (err) {
        console.error(err);
        setLoggedIn(false);
      }
    };

    try {
    } catch (err) {
      console.error(err);
    }
  };
};
