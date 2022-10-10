import AdminActiveStatus from "./Admin/AdminActiveStatus";
import AdminCreate from "./Admin/AdminCreate";
import AdminUpdateProduct from "./Admin/AdminUpdateProduct";

const Admin = () => {
  return (
    <div>
      <div>
        <AdminCreate />
      </div>
      <div>
        <AdminActiveStatus />
      </div>
      <div>
        <AdminUpdateProduct />
      </div>
    </div>
  );
};

export default Admin;
