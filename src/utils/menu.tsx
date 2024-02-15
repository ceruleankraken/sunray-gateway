import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PaymentsIcon from '@mui/icons-material/Payments';

export const menus:({title: string, path: string, url: string, icon: any, child?: any})[] = [
  {
    title: 'Home',
    path : '/',
    url  : '',
    icon : <DashboardIcon />,
  },
  {
    title: 'Partner',
    path : '/partner',
    url  : 'partner',
    icon : <PeopleIcon />,
  },
  {
    title: 'Product',
    path : '/product',
    url  : 'product',
    icon : <Inventory2Icon />,
  },
  {
    title: 'Invoice',
    path : '/invoice',
    url  : 'invoice',
    icon : <ReceiptIcon />,
  },
  {
    title: 'Payment',
    path : '/payment',
    url  : 'payment',
    icon : <PaymentsIcon />,
  },
]