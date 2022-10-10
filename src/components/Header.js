import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'

const Header = ({
  loggedIn,
  setLoggedIn,
  setUsername,
  setPassword,
  isadmin,
}) => {
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
        <Link id="brand-name" to="/">
          Pokéstop
        </Link>
      {loggedIn ? (
        <>
          <nav id="links">
            <Link to="/profile">Profile</Link> | {""}
            {isadmin ? <Link to="admin">Admin | {""}</Link> : null}
            <Link to="/products">Products</Link> | {""}
            <Link to="/mycart">My Cart</Link> | {""}
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </nav>
        </>
      ) : (
        <>
          <nav id="links">
            <Link to="/login">Login/Register</Link> | {""}
            <Link to="/products">Products</Link> | {""}
            <Link to="/mycart">My Cart</Link>
          </nav>
        </>
      )}
    </div>
  );
};

export default Header;
