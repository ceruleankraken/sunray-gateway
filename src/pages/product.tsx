import React, { useEffect } from 'react'

import AppLayout from '@/layout/AppLayout'
import { Box, Button, Paper, Toolbar, Typography, Grid, Stack} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import ProductTableComponent from '@/components/product/productTable.component'
import BreadcrumbsComponent from '@/components/breadCrumb.component';


export default function Product() {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);
  
  return (
    <AppLayout title={"Product"}>
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
                <Typography variant="h4" color="black" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Product</Typography>
                <BreadcrumbsComponent />
              </Box>
              <Box>
                <Button
                  id        = 'product-add'
                  variant   = 'contained'
                  color     = 'secondary'
                  onClick   = {handleOpenCreateModal}
                  startIcon = { <AddIcon /> }
                  sx        = {{
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

          <ProductTableComponent 
            openCreate        = {openCreateModal}
            handleCloseCreate = {handleCloseCreateModal}
          />
        </Paper>
    </AppLayout>
  )
}
