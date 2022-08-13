import React, { useEffect } from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'

import { ThemeProvider } from '@mui/material/styles'

import {
  useAppDispatch,
  useAppSelector
} from 'app/hooks'
import ThemeModeButton from 'features/switchTheme/button'
import { selectTheme } from 'features/switchTheme/themeSlice'
import { InputLink, EditButton } from 'features/repository/inputLink'
import {
  updateOwner, activateOwner, selectOwner,
  updateRepo, activateRepo, selectRepo,
  selectIssues, fetchIssues, selectReady, selectError, clearError
} from 'features/repository/repositorySlice'
import DataTable from 'features/table/datagrid'
import Carousel from 'features/favourites/carousel'
import DetailModal from 'features/details/detailModal'

function App () {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const repo = useAppSelector(selectRepo)
  const owner = useAppSelector(selectOwner)
  const ready = useAppSelector(selectReady)
  const issues = useAppSelector(selectIssues)
  const error = useAppSelector(selectError)

  useEffect(() => {
    dispatch(fetchIssues(undefined))
  }, [ready, repo.payload, owner.payload])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        aria-label="top-navigation"
        enableColorOnDark
      >
        <Toolbar sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              maxWidth: 'fit-content',
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
              ISSUE TRACKER
          </Typography>
          <ThemeModeButton aria-label="switch-mode" />
        </Toolbar>
      </AppBar>
      <main>
        <DetailModal />
        {error && <Snackbar
          open={!!error}
          message={error.message}
          onClose={() => dispatch(clearError())}
        />}
        <Container sx={{ height: '100%', maxWidth: 'xl', my: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Box sx={{ alignItems: 'flex-end', height: 'fit-content' }}>
              <InputLink
                activate={activateOwner}
                select={selectOwner}
                update={updateOwner}
                label="Repository Owner Name"
              />
              {!owner.active && <EditButton activate={activateOwner} />}
            </Box>
            <Box sx={{ alignItems: 'flex-end', height: 'fit-content' }}>
              <InputLink
                activate={activateRepo}
                label="Repository Name"
                select={selectRepo}
                update={updateRepo}
              />
              {!repo.active && <EditButton activate={activateRepo} />}
            </Box>
          </ Breadcrumbs>
          <Divider sx={{ my: 4 }} variant="middle" />
          <Carousel />
          <Divider sx={{ my: 4 }} variant="middle" />
          <DataTable rows={issues} />
        </Container>
      </main>
    </ThemeProvider>
  )
}

export default App
