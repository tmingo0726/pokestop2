import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Footer, Register } from "./components";
const container = document.getElementById("app");
const root = createRoot(container);

const { REACT_APP_BASE_URL: BASE_URL } = process.env; // ask tom how this works

const App = () => {
  const [token, setToken] = useState("");

  return (
    <div>
      <h1>Pokestop</h1>
      <h3>Your one stop shop to "be the very best"</h3>
      {/* Change span to Link once we have appropriate routes set up*/}
      <Link to="/login">Login </Link>
      <Link to="/register">Register </Link>
      <span>Products </span>
      <span>My Cart </span>
      <Routes>
        {/* <Route exact path ="/" element={<Products />} */}
        <Route exact path="/register" element={<Register />}></Route>
      </Routes>
      {/* Change span to Link once we have appropriate routes set up*/}
      <Footer />
    </div>
  );
};

root.render(
  <Router>
    <App />
  </Router>
);
