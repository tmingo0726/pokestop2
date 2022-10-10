import AdminActiveStatus from "./AdminActiveStatus";

const { default: AdminCreate } = require("./AdminCreate");

const Admin = () => {
  return (
    <div>
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
