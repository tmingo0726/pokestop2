import { useState } from "react";
// import { BASE_URL} from
require("dotenv").config();
const JWT = require("jsonwebtoken");

const Register = (props) => {
  const { isadmin } = props;
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [registered, setRegistered] = useState(false);
  // const [ passwordError , setPasswordError ] = useState(null);
  // const [ usernameError, setUsernameError ] = useState(null)

  const registerNewCustomer = async (
    username,
    password,
    firstname,
    lastname,
    email,
    address,
    isadmin
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          firstname,
          lastname,
          email,
          address,
          isadmin,
        }),
      });
      const result = await response.json();
      setRegistered(result.token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    {
      newPassword == confirmPassword
        ? registerNewCustomer(
            newUsername,
            newPassword,
            firstname,
            lastname,
            email,
            address,
            isadmin
          ) && setErrorMessage(null)
        : setErrorMessage("Error");
    }
    {
      errors == true ? setErrors("UserError") : setErrors(null);
    }
  };

  //   const PasswordError = () => {
  //     if (errorMessage) {
  //       return <h2>Passwords do not match!</h2>;
  //     }
  //     return;
  //   };

  //   const UsernameError = () => {
  //     if (errors) {
  //       return <h2>A user by that username already exists!</h2>
  //     }
  //     return;
  //   }

  return (
    <div>
      <form id="registration" onSubmit={handleSubmit}>
        {registered ? (
          <Navigate to="/customers/login" />
        ) : (
          <>
            <h2>New Customer Registration Form</h2>
            <div>
              <input
                value={newUsername}
                placeholder="Please enter a username"
                required
                minLength={5}
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={newPassword}
                placeholder="Please enter password"
                required
                type="password"
                minLength={8}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={confirmPassword}
                placeholder="Please confirm password"
                required
                type="password"
                minLength={8}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={firstname}
                placeholder="Please enter your first name"
                required
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={lastname}
                placeholder="Please enter your last name"
                required
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={address}
                placeholder="Please enter shipping address"
                required
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              ></input>
            </div>
            <div>
              <input
                value={email}
                placeholder="Please enter your email"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div id="error">
              {/* <PasswordError />
              <UsernameError /> */}
            </div>
            <div>
              <button type="submit">Submit!</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
