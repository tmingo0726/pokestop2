import { useState, useEffect } from "react";
import "../stylesheets/MyProfile.css";

const BASE_URL = "http://localhost:4000/api";

const MyProfile = (props) => {
  const { username } = props;
  const [profile, setProfile] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const updateMyProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers/${username}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          address
        }),
      });
      const result = await response.json();
      setError(result.error);
      setErrorMessage(result.message);
      setSuccess(result.success);
      console.log("UPDATE PROFILE RESULTS", result);
    } catch (err) {
      console.error(err);
    }
  };

  const getMyProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setProfile(result);
      console.log("PROFILE RESULT", result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateMyProfile(firstname, lastname, email);
    await getMyProfile();
    setFirstname("");
    setLastname("");
    setEmail("");
    setAddress("");
  };
  return (
    <div>
      <div id="profile-wrapper">
        <form
          id="update-form"
          className="form admin-form"
          onSubmit={handleSubmit}
        >
          <fieldset className="input-wrapper">
            <legend id="form-legend">
              <h2 id="profile-header">{username}'s Trainer Profile</h2>
            </legend>
            <div id="profile-inputs">
              <div className="profile-input-wrap">
                <p className="profile-info" id="profile-firstname">
                  First Name: {profile.firstname}
                </p>
                <input
                  type="text"
                  id="update-profile-input"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(event) => {
                    setFirstname(event.target.value);
                  }}
                ></input>
              </div>
              <div className="profile-input-wrap">
                <p className="profile-info" id="profile-lastname">
                  Last Name: {profile.lastname}
                </p>
                <input
                  type="text"
                  id="update-profile-input"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(event) => {
                    setLastname(event.target.value);
                  }}
                ></input>
              </div>
              <div className="profile-input-wrap">
                <p className="profile-info" id="profile-email">
                  Email: {profile.email}
                </p>
                <input
                  type="text"
                  id="update-profile-input"
                  value={email}
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></input>
              </div>
              <div className="profile-input-wrap">
                <p className="profile-info" id="profile-address">
                  Address: {profile.address}
                </p>
                <input
                  type="text"
                  id="update-profile-input"
                  value={address}
                  placeholder="Address"
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                ></input>
              </div>
              <br />
              <button
                disabled={!firstname && !lastname && !email && !address}
                className="form-btn"
                type="submit"
              >
                Update Profile!
              </button>
              <div className="error-message">
                {error ? `${errorMessage}` : `${success}`}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
