import AdminActiveStatus from "./Admin/AdminActiveStatus";
import AdminCreate from "./Admin/AdminCreate";

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
