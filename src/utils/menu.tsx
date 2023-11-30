import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const menus:({title: string, path: string, icon: any})[] = [
  {
    title: 'Home',
    path : '/',
    icon : <DashboardIcon />,
  },
  {
    title: 'Order',
    path : '/order',
    icon : <ShoppingCartIcon />,
  },
  {
    title: 'Customer',
    path : '/customer',
    icon : <PeopleIcon />,
  },
  {
    title: 'Partner',
    path : '/partner',
    icon : <PeopleIcon />,
  },
  {
    title: 'Invoice',
    path : '/invoice',
    icon : <ReceiptIcon />,
  },
]