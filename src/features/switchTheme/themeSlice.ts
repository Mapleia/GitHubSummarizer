import { createSlice } from '@reduxjs/toolkit'
import { theme } from 'common/theme'
import { createTheme } from '@mui/material/styles'
import { RootState } from 'app/store'

const initialState = theme

const preferenceSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      createTheme({
        palette: {
          mode: state.palette.mode === 'dark' ? 'light' : 'dark'
        }
      })
    }
  }
})

export const { toggleTheme } = preferenceSlice.actions

export const selectMode = (state: RootState) => state.theme.palette.mode

export default preferenceSlice.reducer
