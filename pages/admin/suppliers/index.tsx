import { DashboardOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { FullScreenLoading } from "../../../components/ui";
import { SuplierContext } from "../../../context/supplier/SupplierContext";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "phone", headerName: "Telefono", width: 200 },
  { field: "rut", headerName: "Rut", width: 200 },
  { field: "web", headerName: "Web", width: 200 },
  /*
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" >
                    Ver orden
                </a>
            )
        }
    },

    { field: 'createdAt', headerName: 'Creada en', width: 300 },
*/
];

const SupplierPage = () => {
  const { suppliers, isLoading } = useContext(SuplierContext);

  if(!isLoading) return <><FullScreenLoading/></>

  const rows = suppliers!.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    email: supplier.email,
    phone: supplier.phone,
    rut: supplier.rut,
    web: supplier.web,
  }));
  return (
    <AdminLayout
      title="Proveedores"
      subTitle="Gestionar Proveedores"
      icon={<DashboardOutlined />}>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default SupplierPage;
