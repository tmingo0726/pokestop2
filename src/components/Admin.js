import AdminActiveStatus from "./Admin/AdminActiveStatus";
import AdminCreate from "./Admin/AdminCreate";
import AdminUpdateProduct from "./Admin/AdminUpdateProduct";
import AdminCustomer from "./Admin/AdminCustomer";

const Admin = () => {
  return (
    <div id="admin-panel-wrap">
      <div>
        <AdminCreate />
      </div>
      <div>
        <AdminActiveStatus />
      </div>
      <div>
        <AdminUpdateProduct />
      </div>
      <div>
        <AdminCustomer />
      </div>
    </div>
  );
};

export default Admin;
