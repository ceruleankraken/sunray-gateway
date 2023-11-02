import React from 'react';
import { Box, Container, Toolbar } from "@mui/material";
import Head from "next/head"
import TopBarComponent from "./TopBar"
import SideBarComponent from "./SideBar"
import BottomBar from './BottomBar';
import BottomBarComponent from './BottomBar';
import { usePathname } from 'next/navigation';
import useRedirect from '@/hooks/other/use-redirect';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import useLogout from '@/hooks/auth/use-logout';;

interface AppProps {
  title: string,
  children: React.ReactNode,
}

const AppLayout = ({ title, children }: AppProps) => {
  const { refetch: doLogout }    = useLogout();
  const [open, setOpen]          = React.useState(true);
  const pathname                 = usePathname();
  const handleToggle: () => void = () => {
    // e.preventDefault()
    // console.log(open);
    setOpen(!open);
  };

  const accessToken = useTypedSelector(
    (state) => state.reducer.user.accessToken,
  );
  
  const refreshToken = useTypedSelector(
    (state) => state.reducer.user.refreshToken,
  );
  
  useRedirect({
    toUrl    : '/login',
    condition: !!accessToken === false,
  });

  
  // const [menuSelected, setMenuSelected] = React.useState("");
  // const menuSelectedToggle: (selected: string) => void  = (selected: string) => {
  //   console.log("pilihan: "+selected);
  //   console.log("status: "+menuSelected);
  //   setMenuSelected(selected);
  // };



  return (
    <>
      <Head>
        <title> {title} | NEXTT </title>
      </Head>

      {!!accessToken && (
        <>
          <TopBarComponent opened={open} handleToggle={handleToggle} onLogout={doLogout}/>
          <SideBarComponent
            opened       = {open}
            handleToggle = {handleToggle}
            pathActive   = {pathname}
          />
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                      :    theme.palette.grey[900],
              display  : 'flex',
              flexGrow : 1,
              flexFlow : 'column',
              flexWrap : 'nowrap',
              minHeight: '100vh',
            }}
          >
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                        :   theme.palette.grey[900],
                flexGrow: 1,
                // width: '100%',
                // height  : '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
                {children}
              </Container> 
            </Box>
            <BottomBarComponent/>

          </Box>
        </>
      )}
    </>
  );
};

export default AppLayout;