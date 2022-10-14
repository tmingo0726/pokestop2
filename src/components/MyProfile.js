// import { useState, useEffect } from "react";
// import "../stylesheets/MyProfile.css";
import EditProfile from "./EditProfile";
import PurchaseHistory from "./PurchaseHistory";

const MyProfile = (props) => {
  const { password, setPassword } = props;

  return (
    <div id="admin-panel-wrap">
      <div id="edit-profile-table">
        <EditProfile password={password} setPassword={setPassword} />
      </div>
      <div id="purchase-history-table">
        <PurchaseHistory />
      </div>
    </div>
  );
};

export default MyProfile;
