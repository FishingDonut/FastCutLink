"use client";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export default function ThemeMain({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#cb02ee',
        light: '#e28bf5',
        dark: '#ac00e5',
        contrastText: '#fff',
      },
      secondary: {
        main: '#25ee02',
        light: '#b0fa9e',
        dark: '#00c700',
        contrastText: '#fff',
      },
      background: {
        default: '#313448',
        paper:'#313448'
      },
    },
    components: {
      MuiChip:{
        styleOverrides: {
          root: () => ({
            color: "white",
            fontWeight: "bold"
          })
        }
      }
    }
  });

  return (<ThemeProvider theme={theme}>{children}</ThemeProvider>);
}
