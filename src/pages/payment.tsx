import React, { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import AppLayout from '@/layout/AppLayout'
import { Box, Button, Paper, Toolbar, Typography, Grid, Stack} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import BreadcrumbsComponent from '@/components/breadCrumb.component'
import PaymentTableComponent from '@/components/payment/paymentTable.component'


export default function Payment() {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);
  
  return (
    <AppLayout title={"Payment"}>
        <Paper 
          sx={{
            p            : 2,
            display      : 'flex',
            flexDirection: 'column',
            // height       : 240,
          }}
        >
          <Box mb={1}>
            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
              <Box flexGrow={1}>
                <Typography variant="h4" color="black" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Invoice</Typography>
                <BreadcrumbsComponent />
              </Box>
              <Box>
                <Button
                  id            = 'payment-add'
                  variant       = 'contained'
                  color         = 'secondary'
                  onClick       = {handleOpenCreateModal}
                  startIcon     = { <AddIcon /> }
                  sx={{
                    justifyContent: 'center',
                    alignItems    : 'center',
                    alignContent  : 'center',
                  }}
                >
                  Add New
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>

        <PaymentTableComponent 
          openCreate        = {openCreateModal}
          handleCloseCreate = {handleCloseCreateModal}
        />
    </AppLayout>
  )
}
