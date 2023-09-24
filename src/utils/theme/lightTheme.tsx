/*export const lightPalette = {
    50: '#fef9fa',
    100: '#fcf1f2',
    200: '#fae7ea',
    300: '#f7dde2',
    400: '#f6d6db',
    500: '#f4cfd5',
    600: '#f3cad0',
    700: '#f1c3ca',
    800: '#efbdc4',
    900: '#ecb2ba',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#ffffff',
    A700: '#ffffff',
    'contrastDefaultColor': 'light',
};*/

import { darken, lighten } from '@mui/system';

export const lightTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#e56b70',
      light: lighten('#e56b70', 0.5),
      dark: darken('#e56b70', 0.1),
      contrastText: 'rgba(236, 236, 252, 1)',
    },
    secondary: {
      main: '#e3b39e',
      light: lighten('#e8ac88', 0.5),
      dark: darken('#e8ac88', 0.1),
      contrastText: '#0e1421',
    },
    warning: {
      main: '#ff9800',
      light: 'rgb(255, 172, 51)',
      dark: 'rgb(178, 106, 0)',
      contrastText: '#0e1421',
    },
    info: {
      main: '#2196f3',
      light: 'rgb(77, 171, 245)',
      dark: 'rgb(23, 105, 170)',
      contrastText: 'rgba(236, 236, 252, 1)',
    },
    success: {
      main: '#4caf50',
      light: 'rgb(111, 191, 115)',
      dark: 'rgb(53, 122, 56)',
      contrastText: '#0e1421',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      default: 'rgb(245, 245, 255)',
      paper: 'rgba(236, 236, 252, 1)',
    },
    text: {
      primary: '#0e1421',
      secondary: lighten('#0e1421', 0.8),
      disabled: lighten('#0e1421', 0.38),
      hint: lighten('#0e1421', 0.38),
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
  minHeight: 56,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250, // most basic recommended timing
      standard: 300, // this is to be used in complex animations
      complex: 375, // recommended when something is entering screen
      enteringScreen: 225, // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: lighten('#0e1421', 0.38),
          },
        },
      },
    },
  },
};
