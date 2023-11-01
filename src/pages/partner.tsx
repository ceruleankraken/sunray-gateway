import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AppLayout from '@/layout/AppLayout'
import { Box, Container, Paper, Toolbar, Typography, Grid, Stack} from '@mui/material'

import TableComponent from '@/components/table.component'
import MenuListComponent from '@/components/menuList.component'
import { AlertError, AlertInfo, AlertSuccess, AlertWarning } from '@/utils/notification'
import ModalComponent from '@/components/modal.component'
import PartnerCreate from '@/modals/partner/create'

const inter = Inter({ subsets: ['latin'] })

const test = () => {
  AlertInfo("Hello");
  AlertWarning("Hello");
  AlertError("Hello");
  AlertSuccess("Hello");
}

export default function Partner() {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);
    
  const menuList: {handleClick: ()=>void, title: string}[] = [{
    handleClick: handleOpenCreateModal,
    title      : 'Create Partner',
  },{
    handleClick: test,
    title      : 'Test',
  }]

  return (
    <AppLayout title={"Partner"}>
      {/* <Container
        maxWidth       = {false}
        disableGutters = {true}
      >
        <Paper
          sx={{
            p            : 2,
            display      : 'flex',
            flexDirection: 'column',
            height       : 240,
          }}
        >
          <Typography variant="h4" color="initial" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>User</Typography>
        </Paper>
      </Container> */}

      {/* <Container disableGutters sx={{mr:0, ml:0, display: 'initial'}}> */}
        <Paper 
          sx={{
            p            : 2,
            display      : 'flex',
            flexDirection: 'column',
            // height       : 240,
          }}
        >
        <Box mb={3}>
          <Stack direction={"row"} display={"flex"} alignItems={"center"}>
            <Box flexGrow={1}>
              <Typography variant="h4" color="initial" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Partner</Typography>
              <Typography variant="body1" color="initial" height={20} lineHeight={1} fontSize={'1 rem'}>{'Dashboard > Partner'}</Typography>
            </Box>
            <Box>
              <MenuListComponent 
                buttonTitle = 'Action'
                menuArray   = {menuList}
                buttonId    = 'partner-action'
                modalId     = 'partner-modal'
                />
            </Box>
          </Stack>
        </Box>
        
          <TableComponent />
        </Paper>
        <ModalComponent
          modalOpen    = {openCreateModal}
          modalOnClose = {handleCloseCreateModal}
          modalSize    = 'sm'
          modalTitle   = 'Create Partner'
        >
          <PartnerCreate modalOnClose={handleCloseCreateModal}/>
        </ModalComponent>
      {/* </Container> */}
    </AppLayout>
  )
}
