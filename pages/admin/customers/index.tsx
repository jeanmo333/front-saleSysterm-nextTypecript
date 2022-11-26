import { DashboardOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useContext } from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { FullScreenLoading } from '../../../components/ui';
import { CustomerContext } from '../../../context';
import { customerReducer } from '../../../context/customer/customerReducer';


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

const CustomerPage = () => {

  const { customers, isLoading } = useContext(CustomerContext);

  if(!isLoading) return <><FullScreenLoading/></>

  const rows = customers!.map((customer) => ({
    id      : customer.id,
    name    : customer.name,
    email   : customer.email,
    phone   : customer.phone,
    rut     : customer.rut,
    web     : customer.web,
  }));
  return (
    <AdminLayout
    title='Clientes'
    subTitle='Gestionar Clientes'
    icon={ <DashboardOutlined /> }
>
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
  )
}

export default CustomerPage