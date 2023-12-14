import React from 'react';
import { Typography, Box } from '@mui/material';
import MuiLink from '@mui/material/Link';

export default function BottomBarComponent() {
  return (
    <Box sx={{
      alignContent  : 'center',
      justifyContent: 'center',
      paddingY      : 1,
    }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="secondary" href="/">
          MyFaktur.ID
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}