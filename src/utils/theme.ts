import { Public_Sans, Roboto } from 'next/font/google';
import { alpha, createTheme, getContrastRatio } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const publicSans = Public_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

const mainBase      = '#556cd6'
const secondaryBase = '#19857b'
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main        : alpha(mainBase, 0.7),
      light       : alpha(mainBase, 0.5),
      dark        : alpha(mainBase, 0.9),
      contrastText: getContrastRatio(alpha(mainBase, 0.7), '#fff') > 3 ? '#fff': '#111',
    },
    secondary: {
      main        : alpha(secondaryBase, 0.7),
      light       : alpha(secondaryBase, 0.5),
      dark        : alpha(secondaryBase, 0.9),
      contrastText: getContrastRatio(alpha(secondaryBase, 0.7), '#fff') > 3 ? '#fff': '#111',
    },
    error: {
      main        : alpha(red.A400, 0.7),
      light       : alpha(red.A400, 0.5),
      dark        : alpha(red.A400, 0.9),
      contrastText: getContrastRatio(alpha(red.A400, 0.7), '#fff') > 3 ? '#fff': '#111',
    },
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
    fontFamily: publicSans.style.fontFamily, 
    // h4: {
    //   fontSize: '1.5rem'
    // }
  },
});

export default theme;