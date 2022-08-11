import React from 'react'

import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { toggleTheme, selectMode } from 'features/switchTheme/themeSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

export default function SwitchButton () {
  const mode = useAppSelector(selectMode)
  const dispatch = useAppDispatch()

  return (
    <IconButton sx={{ ml: 1 }} onClick={() => dispatch(toggleTheme())} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
