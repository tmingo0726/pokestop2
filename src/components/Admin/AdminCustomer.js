import { useState } from "react";
import "../../stylesheets/AdminCustomer.css";

const BASE_URL = "http://localhost:4000/api";

const AdminCustomer = () => {
  const [customerUsername, setCustomerUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isadmin, setIsadmin] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

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
      setCustomerId(result.viewCustomer.id);
      console.log("result.viewCustomer.isadmin", result.viewCustomer.isadmin);
    } catch (err) {
      console.error(err);
    }
  };

  const setAdmin = async (customerId, isadmin) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/setadmin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: customerId,
          isadmin,
        }),
      });
      const result = await response.json();
      setAdminSuccess(result.success);
      console.log("ADMIN PERMISSION RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/deletecustomer`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      const result = await response.json();
      setDeleteSuccess(result.success);
      console.log("RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    setSuccess("");
    deleteCustomer(customerId);
  };

  const toggleAdminStatus = (boolean) => {
    setAdmin(customerId, boolean);
    setAdminSuccess("");
    setDeleteSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getCustomerInfo(customerUsername);
  };
  return (
    <div>
      <form
        id="delete-form"
        className="form admin-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="input-wrapper">
          <legend id="header-legend">
            <h2 id="delete header" className="form-header">
              Customer Information
            </h2>
          </legend>
          <div id="delete-inputs">
            <legend id="form-legend">Customer Username: </legend>
            <input
              type="text"
              id="delete-customer-input"
              value={customerUsername}
              placeholder="Username"
              required
              onChange={(event) => {
                setCustomerUsername(event.target.value);
              }}
            ></input>
          </div>
        </fieldset>
        <button id="search-customer-btn" className="form-btn" type="submit">
          Search For Customer!
        </button>
        {error ? `${errorMessage}` : null}
        {success ? (
          isadmin ? (
            <button
              id="demote-btn"
              className="form-btn"
              //   className="toggle-admin-btn"
              onClick={() => toggleAdminStatus(false)}
            >
              Demote to scrub!
            </button>
          ) : (
            <button
              id="promote-btn"
              className="form-btn"
              //   className="toggle-admin-btn"
              onClick={() => toggleAdminStatus(true)}
            >
              Promote to Admin!
            </button>
          )
        ) : null}
        {success ? (
          <button
            id="delete-btn"
            className="form-btn"
            onClick={() => handleDeleteCustomer(customerId)}
          >
            Goodbye Forever!
          </button>
        ) : null}
        <div className="error-message">
          {adminSuccess ? `${adminSuccess}` : null}
          {deleteSuccess ? `${deleteSuccess}` : null}
        </div>
      </form>
    </div>
  );
};

export default AdminCustomer;
