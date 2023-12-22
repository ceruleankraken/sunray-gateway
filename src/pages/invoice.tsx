import React, { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import AppLayout from '@/layout/AppLayout'
import { Box, Button, Paper, Toolbar, Typography, Grid, Stack} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import PartnerTableComponent from '@/components/partner/partnerTable.component'
import InvoiceTableComponent from '@/components/invoice/invoiceTable.component'


export default function Invoice() {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);
  
  return (
    <AppLayout title={"Invoice"}>
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
                <Typography variant="h4" color="black" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Invoice</Typography>
                <Typography variant="body1" color="black" height={20} lineHeight={1} fontSize={'1 rem'}>{'Dashboard > Invoice'}</Typography>
              </Box>
              <Box>
                <Button
                  id            = 'invoice-add'
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

          <InvoiceTableComponent 
            openCreate        = {openCreateModal}
            handleCloseCreate = {handleCloseCreateModal}
          />
        </Paper>
    </AppLayout>
  )
}
