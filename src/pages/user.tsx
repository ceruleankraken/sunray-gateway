import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AppLayout from '@/layout/AppLayout'
import { Box, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function User() {
  return (
    <AppLayout title={"TS"}>
      <Grid container spacing={1}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
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
        </Grid>
      </Grid>
    </AppLayout>
  )
}
