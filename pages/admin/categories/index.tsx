import { DashboardOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { Grid } from "@mui/material";
import { amatecApi } from "../../../api";

import axios from "axios";
import { FullScreenLoading } from "../../../components/ui";
import { CategoryContext } from "../../../context/categories/CategoryContext";
import useSWR from "swr";
import { ICategory } from "../../../interfaces/category";
import Cookies from "js-cookie";


const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "description", headerName: "Descripcion", width: 350 },
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



const CategoryPage= () => {


 const { categories, isLoading } = useContext(CategoryContext);

 if(!isLoading) return <><FullScreenLoading/></>
  

  const rows = categories!.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));


  //if ( categories?.length ===0 ) return (<><FullScreenLoading /></>);

  return (
    <AdminLayout
      title="Categorias"
      subTitle="Gestionar Categorias"
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


export default CategoryPage;