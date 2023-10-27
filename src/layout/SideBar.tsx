import React from 'react'
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBarProps, Box, DrawerProps, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from "next/router";
import Link from "next/link";
import { menus } from '@/utils/menu';

const drawerWidth: number = 240;

interface AppSideBarProps extends DrawerProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<AppSideBarProps>(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: '60px',
        // [theme.breakpoints.up('sm')]: {
        //   width: '40px',
        // },
      }),
    },
  }),
);


const SideBarComponent = ( {opened, handleToggle, pathActive, ...props}: any ) => {
  const router = useRouter();

  return (
    <Drawer variant="permanent" open={opened}>
      
      <Toolbar
        sx={{
          display       : 'flex',
          alignItems    : 'center',
          // justifyContent: 'flex-end',
          px            : [1],
        }}
      >
          <Typography variant="h4" flexGrow={1}  align={"center"} color="primary">MENU</Typography>
        {/* </Box> */}
        <IconButton onClick={handleToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <List component="nav">
        {
          menus.map(menu => {
            const active = menu.path ? (pathActive === menu.path) : false;

            return (
              <Link 
                key  = {menu.title}
                href = {menu.path}
                passHref
              >
                <ListItemButton
                  selected={active}
                >
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </Link>
            );
          })
        }
        
        {/* <Link href="/order" passHref> 
          <ListItemButton
            key      = '2'
            id       = '2'
            selected = {menuSelected==="order"}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </Link>
        
        <Link href="/customer" passHref>
          <ListItemButton
            key      = '3'
            id       = '3'
            selected = {menuSelected==="customer"}
            onClick  = {() => menuToggle("customer")}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </Link> */}
        {/* <Divider sx={{ my: 1 }} /> */}
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  )
}

export default SideBarComponent