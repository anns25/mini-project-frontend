import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D3A00',
    },
    secondary: {
      main: '#C9A66B',
    },
    background: {
      default: '#F2E9DC',
    },
    text: {
      primary: '#2E2E2E',
    },
  },
  typography: {
    fontFamily: 'Lora, "Playfair Display", serif',
    h1: {
      fontFamily: 'Playfair Display',
    },
    h2: {
      fontFamily: 'Merriweather',
    },
    body1: {
      fontFamily: 'Lora',
    },
  },
});

export default theme;


