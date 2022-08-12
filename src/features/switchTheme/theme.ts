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

const lightThemeOptions = { ...themeOptions }
if (lightThemeOptions.palette) lightThemeOptions.palette.mode = 'light'

export const lightTheme: Theme = createTheme(lightThemeOptions)

const darkThemeOptions = { ...themeOptions }
if (darkThemeOptions.palette) darkThemeOptions.palette.mode = 'dark'

export const darkTheme: Theme = createTheme(darkThemeOptions)
