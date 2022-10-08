import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Footer,
  Register,
  Login,
  Header,
  Products,
  Details,
  Admin,
} from "./components";

const container = document.getElementById("app");
const root = createRoot(container);

const { REACT_APP_BASE_URL: BASE_URL } = process.env; // ask tom how this works

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [chosenCard, setChosenCard] = useState(0);

  return (
    <div>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
        setPassword={setPassword}
        isadmin={isadmin}
      />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route
          path="/products"
          element={
            <Products
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              chosenCard={chosenCard}
              setChosenCard={setChosenCard}
            />
          }
        ></Route>
        <Route
          path="/products/details"
          element={<Details chosenCard={chosenCard} />}
        ></Route>
        <Route
          exact
          path="/"
          element={
            <Products
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              chosenCard={chosenCard}
              setChosenCard={setChosenCard}
            />
          }
        ></Route>
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
              setIsadmin={setIsadmin}
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
