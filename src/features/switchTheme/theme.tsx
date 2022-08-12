import React from 'react'

import { ThemeOptions, Theme } from '@mui/material'

import { createTheme } from '@mui/material/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

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
    h3: {
      fontFamily: 'Space Grotesk'
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: true
      }
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <FavoriteBorderIcon />,
        checkedIcon: <FavoriteIcon />
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
