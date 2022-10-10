import AdminActiveStatus from "./AdminActiveStatus";

const { default: AdminCreate } = require("./AdminCreate");

const Admin = () => {
  return (
    <div id="admin-panel-wrap">
      <div>
        <AdminCreate />
      </div>
      <div>
        <AdminActiveStatus />
      </div>
    </div>
  );
};

export default Admin;
