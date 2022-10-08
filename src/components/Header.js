import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'

const Header = ({ loggedIn, setLoggedIn, setUsername, setPassword }) => {
  let navigate = useNavigate();
  const logout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div id="header">
      <h1>
        <Link id="links" to="/">
          Pokestop
        </Link>
      </h1>
      {loggedIn ? (
        <>
          <nav id="links">
            <Link to="profile">Profile</Link> | {""}
            <Link to="products">Products</Link> | {""}
            <Link to="mycart">My Cart</Link> | {""}
            <Link to="Login" onClick={logout}>
              Logout
            </Link>
          </nav>
        </>
      ) : (
        <>
          <nav id="links">
            <Link to="Login">Login</Link> | {""}
            <Link to="register">Register</Link> | {""}
            <Link to="products">Products</Link> | {""}
            <Link to="mycart">My Cart</Link>
          </nav>
        </>
      )}
    </div>
  );
};

export default Header;
