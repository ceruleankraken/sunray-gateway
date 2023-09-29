import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AppLayout from '@/layout/AppLayout'
import { Box, Container, Grid, Paper, Toolbar } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Customer() {
  return (
    <AppLayout title={"TS"}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            CUSTOMER
          </Paper>
        </Grid>
      </Grid>
    </AppLayout>
  )
}
