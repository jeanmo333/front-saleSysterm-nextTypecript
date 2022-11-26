import { DashboardOutlined } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const SalesPage = () => {
  return (
    <AdminLayout
      title="Ventas"
      subTitle="Gestionar Ventas"
      icon={<DashboardOutlined />}>
      <div>SalesPage</div>
    </AdminLayout>
  );
};

export default SalesPage;
