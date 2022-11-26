import { DashboardOutlined } from '@mui/icons-material';
import React from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout';

const PurchasePage = () => {
  return (
    <AdminLayout
    title='Compras'
    subTitle='Gestionar Compras'
    icon={ <DashboardOutlined /> }
>
    <div>PurchasePage</div>
    </AdminLayout>
  )
}

export default PurchasePage 