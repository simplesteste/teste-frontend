import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes/index.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/query.ts'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
