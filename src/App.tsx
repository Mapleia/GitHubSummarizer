import React, { useEffect } from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import { ThemeProvider } from '@mui/material/styles'
import ThemeModeButton from 'features/switchTheme/button'
import { selectTheme } from 'features/switchTheme/themeSlice'
import {
  useAppDispatch,
  useAppSelector
} from 'app/hooks'
import { InputLink, EditButton } from 'features/repository/inputLink'
import {
  updateOwner, activateOwner, selectOwner,
  updateRepo, activateRepo, selectRepo,
  selectIssues, fetchIssues, selectReady
} from 'features/repository/repositorySlice'
import octokit from 'features/repository/repoAPI'
import DataTable from 'features/table/datagrid'

function App () {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const repo = useAppSelector(selectRepo)
  const owner = useAppSelector(selectOwner)
  const ready = useAppSelector(selectReady)
  const issues = useAppSelector(selectIssues)

  useEffect(() => {
    dispatch(fetchIssues(undefined))
  }, [ready])

  async function handleTryAPICall () {
    try {
      console.log(await octokit.rest.repos.getViews({ repo: 'LogCompareAPI', owner: 'Mapleia' }))
      const config = {
        repo: 'LogCompareAPI',
        owner: 'Mapleia',
        per_page: 40
      }
      const res = await octokit.paginate('GET /repos/{owner}/{repo}/issues', config)
      console.info('issues', res)
    } catch (err) {
      console.error(err.message)
    }
  }

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
            variant="h2"
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
          <DataTable rows={issues} />
        </Container>

        <Button onClick={handleTryAPICall}>Try API Call</Button>

      </main>
    </ThemeProvider>
  )
}

export default App
