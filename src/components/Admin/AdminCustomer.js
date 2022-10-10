import { useState } from "react";

const BASE_URL = "http://localhost:4000/api";

const AdminCustomer = () => {
  const [customerUsername, setCustomerUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isadmin, setIsadmin] = useState(false);

  const token = localStorage.getItem("token");

  const getCustomerInfo = async (username) => {
    try {
      const response = await fetch(
        `${BASE_URL}/admin/${customerUsername}/info`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("RESULT", result);
      console.log("RESULT", result.success);
      setSuccess(result.success);
      setError(result.error);
      setErrorMessage(result.message);
      setIsadmin(result.viewCustomer.isadmin);
      console.log("result.viewCustomer.isadmin", result.viewCustomer.isadmin);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAdminStatus = (bool) => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    getCustomerInfo(customerUsername);
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>View Customer Information</legend>
          <div id="active-status-inputs">
            <br />
            <legend>Customer Username: </legend>
            <input
              type="text"
              value={customerUsername}
              placeholder="Username"
              required
              onChange={(event) => {
                setCustomerUsername(event.target.value);
              }}
            ></input>
          </div>
        </fieldset>
        <button type="submit">Search For Customer!</button>
        {error ? `${errorMessage}` : null}
        {success ? (
          isadmin ? (
            <button onClick={toggleAdminStatus(false)}></button>
          ) : (
            <button onClick={toggleAdminStatus(true)}></button>
          )
        ) : null}
      </form>
    </div>
  );
};

export default AdminCustomer;
