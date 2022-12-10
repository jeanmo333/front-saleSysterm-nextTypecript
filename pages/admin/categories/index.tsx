import NextLink from "next/link";
import { AddOutlined, Category, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { Box, Button, Grid, IconButton } from "@mui/material";

import { useAuth, useCategories } from "../../../hooks";
import { amatecApi } from "../../../api";
import Cookies from "js-cookie";
import router from "next/router";
import axios from "axios";
import error from "next/error";
import useSWR from "swr";
import { ICategory } from "../../../interfaces";

const CategoryPage = () => {
  const { auth } = useAuth();
  const { data, error } = useSWR<ICategory[]>('http://localhost:4000/api/categories');
  console.log(auth)
  //const { data, error } = useSWR<ICategory[]>(`/api/categories?user=${auth?.id}`);

  const { categories, deleteCategory, setCategories } = useCategories();

  setCategories(data!)

  console.log(error)
  console.log(data)

  const rows = data!.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "description", headerName: "Descripcion", width: 350 },

    {
      field: "check",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <>
            <>
              <NextLink href={`/admin/categories/${row.id}`} passHref>
                <IconButton sx={{ marginRight: 2, color: "white" }}>
                  <Edit sx={{ color: "#FF5733", fontSize: 30 }} />
                </IconButton>
              </NextLink>

              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => deleteCategory(row.id)}>
                <Delete sx={{ fontSize: 30, color: "#C70039" }} />
              </IconButton>
            </>
          </>
        );
      },
    },
  ];

  return (
    <AdminLayout
      title="Categorias"
      subTitle="Gestionar Categorias"
      icon={<Category />}>
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <NextLink href="/admin/categories/CreateCategory" passHref>
          <Button startIcon={<AddOutlined />} color="secondary">
            Crear categoria
          </Button>
        </NextLink>
      </Box>

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

// export const getServerSideProps: GetServerSideProps = async () => {

//   const token = Cookies.get("token");

//   return {
//     props: {
//       token,
//     },
//   };
// };




export default CategoryPage;
