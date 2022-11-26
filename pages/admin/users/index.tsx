import { FC, useContext } from "react";
import { PeopleOutline } from "@mui/icons-material";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { FullScreenLoading } from "../../../components/ui";
import { AuthContext } from "../../../context";
import useSWR from "swr";
import { IUser } from "../../../interfaces";
import Cookies from "js-cookie";
import { GetServerSideProps, NextPage } from "next";
import { amatecApi } from "../../../api";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "roles", headerName: "Roles", width: 200 },
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

interface Props {
  users: IUser;
}

const UsersPage = () => {
  const { users, isLoading } = useContext(AuthContext);

  const rows = users!.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  }));

  if (!isLoading)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}>
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

export default UsersPage;
