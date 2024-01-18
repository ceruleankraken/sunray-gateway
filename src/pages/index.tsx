import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AppLayout from '@/layout/AppLayout'
import { Box, Container, Grid, Paper, Stack, Toolbar, Typography } from '@mui/material'
import BreadcrumbsComponent from '@/components/breadCrumb.component'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AppLayout title={"Home"}>
      <Paper
        sx={{
          p            : 2,
          display      : 'flex',
          flexDirection: 'column',
          height       : 400,
        }}
      >
        <Box mb={3}>
          <Stack direction={"row"} display={"flex"} alignItems={"center"}>
            <Box flexGrow={1}>
              <Typography variant="h4" color="black" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Home</Typography>
              <BreadcrumbsComponent />
            </Box>
          </Stack>
        </Box>
      </Paper>
    </AppLayout>
  )
}
