import { createSlice } from '@reduxjs/toolkit'
import { lightTheme, darkTheme } from 'features/switchTheme/theme'
import { RootState } from 'app/store'

export type ThemeState = {
  current: string
}

const initialState: ThemeState = { current: 'light' }

const preferenceSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light'
    }
  }
})

export const { toggleTheme } = preferenceSlice.actions

export const selectMode = (state: RootState) => state.theme.current
export const selectTheme = (state: RootState) => {
  switch (state.theme.current) {
  case 'light':
    return lightTheme
  default:
    return darkTheme
  }
}

export default preferenceSlice.reducer
