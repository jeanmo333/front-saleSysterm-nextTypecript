import { useContext, useState } from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
  DashboardOutlined,
  Home,
} from "@mui/icons-material";

import { UiContext, AuthContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="left"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}>
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>

        
            <>
              <ListItem button  onClick={() => navigateTo("/admin")}>
                <ListItemIcon>
                <Home/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/categories")}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Categorias"} />
              </ListItem>
            </>
        

          <ListItem
            button
            onClick={() => navigateTo("/admin/customers")}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Clientes"} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigateTo("/admin/products")}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Productos"} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigateTo("/admin/purchases")}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Compras"} />
          </ListItem>


          <ListItem
            button
            onClick={() => navigateTo("/admin/sales")}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ventas"} />
          </ListItem>


          <ListItem
            button
            onClick={() => navigateTo("/admin/suppliers")}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Proveedores"} />
          </ListItem>


       
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
        
        
    

          {/* Admin */}
          {
                    user?.roles.includes('admin') && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo("/admin/users")}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
)}
        </List>
      </Box>
    </Drawer>
  );
};
