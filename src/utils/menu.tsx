import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export const menus:({title: string, path: string, icon: any})[] = [
  {
    title: 'Home',
    path : '/',
    icon : <DashboardIcon />,
  },
  {
    title: 'Partner',
    path : '/partner',
    icon : <PeopleIcon />,
  },
  {
    title: 'Product',
    path : '/product',
    icon : <Inventory2Icon />,
  },
  {
    title: 'Invoice',
    path : '/invoice',
    icon : <ReceiptIcon />,
  },
]