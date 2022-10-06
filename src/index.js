import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Footer, Register, Login, Header } from "./components";

const container = document.getElementById("app");
const root = createRoot(container);

const { REACT_APP_BASE_URL: BASE_URL } = process.env; // ask tom how this works

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isadmin, setIsadmin] = useState(false);

  return (
    <div>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <Routes>
        {/* <Route exact path ="/" element={<Products />} */}
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
};

root.render(
  <Router>
    <App />
  </Router>
);
