import {PeopleAlt } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { useSuppliers } from "../../../hooks";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "phone", headerName: "Telefono", width: 200 },
  { field: "rut", headerName: "Rut", width: 200 },
  { field: "web", headerName: "Web", width: 200 },

];

const SupplierPage = () => {
  const { suppliers } = useSuppliers();


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
      icon={< PeopleAlt />}>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 550, width: "100%" }}>
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
