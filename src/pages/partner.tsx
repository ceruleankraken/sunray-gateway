import React, { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import AppLayout from '@/layout/AppLayout'
import { Box, Button, Paper, Toolbar, Typography, Grid, Stack} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import PartnerTableComponent from '@/components/partner/partnerTable.component'
import BreadcrumbsComponent from '@/components/breadCrumb.component'


export default function Partner() {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);
  
  return (
    <AppLayout title={"Partner"}>
        <Paper 
          sx={{
            p            : 2,
            display      : 'flex',
            flexDirection: 'column',
          }}
        >
          <Box mb={3}>
            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
              <Box flexGrow={1}>
                <Typography variant="h4" color="black" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Partner</Typography>
                <BreadcrumbsComponent />
              </Box>
              <Box>
                <Button
                  id            = 'partner-add'
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

          <PartnerTableComponent 
            openCreate        = {openCreateModal}
            handleCloseCreate = {handleCloseCreateModal}
          />
        </Paper>
    </AppLayout>
  )
}
