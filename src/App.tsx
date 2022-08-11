import React, { useState } from 'react'

// Font primarily used by MUI
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/space-grotesk'

import { ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

import { theme } from 'common/theme'
import ThemeModeButton from 'features/switchTheme/button'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { InputLink, EditButton } from 'features/repository/inputLink'
import { updateOwner, activateOwner, selectOwner, updateRepo, activateRepo, selectRepo } from 'features/repository/repositorySlice'

function App () {
  const dispatch = useAppDispatch()

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar aria-label="top-navigation" enableColorOnDark sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
          >
            ISSUE TRACKER
          </Typography>
          <ThemeModeButton aria-label="switch-mode"/>
        </AppBar>
        <Breadcrumbs aria-label="breadcrumb">
          <InputLink
            activate={activateOwner}
            select={selectOwner}
            update={updateOwner}
          />
          <EditButton activate={activateOwner} />
          <InputLink
            activate={activateRepo}
            select={selectRepo}
            update={updateRepo}
          />
          <EditButton activate={activateRepo} />
        </ Breadcrumbs>

      </Container>
    </ThemeProvider>
  )
}

export default App
