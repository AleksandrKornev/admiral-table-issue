import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import { LIGHT_THEME } from '@admiral-ds/react-ui'

createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <ThemeProvider theme={LIGHT_THEME}>
      <App />
    </ThemeProvider>
  </React.Fragment>,
)
