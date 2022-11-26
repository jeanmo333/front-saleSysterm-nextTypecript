import { useContext} from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

import DehazeIcon from "@mui/icons-material/Dehaze";

import { UiContext } from "../../context";
import { deepOrange } from "@mui/material/colors";
import { AccountCircleOutlined } from "@mui/icons-material";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext);


  return (
    <AppBar >
   
      <Toolbar sx={{marginX: {xs: 0, sm: 22}}} >
        {/********************************************** */}
        <IconButton sx={{ marginRight: 2, color: "white" }}>
          <DehazeIcon
           onClick={toggleSideMenu} 
           sx={{color: deepOrange[500], fontSize:30}}
           />
        </IconButton>

        {/********************************************** */}

        {/********************************************** */}
        <Box flex={1} />
        <NextLink href="/admin" passHref>
          <Link display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              Amatec
            </Typography>
          </Link>
        </NextLink>
        {/********************************************** */}

        {/********************************************** */}
        <Box flex={1} />
        <NextLink href="/admin/account" passHref>
          <Link display="flex" alignItems="center">
          <AccountCircleOutlined sx={{fontSize: 35, color: deepOrange[500], marginBottom:{xs: 0, sm: 1}}} />
          </Link>
        </NextLink>
        {/********************************************** */}
      </Toolbar>
    </AppBar>
  );
};
