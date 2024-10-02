import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#007BFF', // Brand primary color
            },
            secondary: {
              main: '#6c757d', // Brand secondary color
            },
            background: {
              default: '#ffffff',
              paper: '#f8f9fa',
            },
            text: {
              primary: '#212529',
              secondary: '#6c757d',
            },
          }
        : {
            primary: {
              main: '#495057', // Muted accent color for dark theme
            },
            secondary: {
              main: '#adb5bd', // Muted secondary color for dark theme
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#f8f9fa',
              secondary: '#adb5bd',
            },
          }),
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h4: {
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;