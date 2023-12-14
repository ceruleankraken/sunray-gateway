import React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const TopBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const TopBarComponent = ( {opened, handleToggle, onLogout, ...props}: any) => {

  return (
    <TopBar position="absolute" open={opened}>
      <Toolbar
        sx={{
          opacity: '1',
          bgcolor: 'secondary.main',
          pr     : '24px',             // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge       = "start"
          color      = "inherit"
          aria-label = "open drawer"
          onClick    = {handleToggle}
          sx         = {{
            marginRight: '36px',
            ...(opened && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography> */}
        <IconButton 
          color   = "inherit"
          onClick = {onLogout}
          sx={{
            flexGrow      : 1,
            justifyContent: "flex-end"
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </TopBar>
  );
}

export default TopBarComponent