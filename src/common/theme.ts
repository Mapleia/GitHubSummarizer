import { ThemeOptions, Theme } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#713feb',
      dark: '#4523b8'
    },
    secondary: {
      main: '#a5aff5',
      light: '#d2d7fa'
    }
  },
  typography: {
    h1: {
      fontFamily: 'Space Grotesk'
    },
    h2: {
      fontFamily: 'Space Grotesk'
    },
    h4: {
      fontFamily: 'Space Grotesk'
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: true
      }
    }
  }
}

export const theme: Theme = createTheme(themeOptions)
