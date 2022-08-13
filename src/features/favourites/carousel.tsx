import React, { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import CardHeader from '@mui/material/CardHeader'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectSelected } from 'features/repository/repositorySlice'
import { setIssue, setOpen } from 'features/details/detailsSlice'

export default function Carousel () {
  const issues = useAppSelector(selectSelected)
  const [active, setActive] = useState<number|undefined>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (issues.length > 0 && active !== undefined) {
      const issue = issues[active]
      dispatch(setIssue(issue))
      dispatch(setOpen(true))
    }
  }, [issues, active])

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={active}
      onChange={(event, newValue: number) => {
        if (issues.length === 0) setActive(undefined)
        else setActive(newValue)
      }}
    >
      {issues.map((issue) => (
        <Tab
          key={issue.id}
          label={
            <Card sx={{ width: 250, height: 150 }}>
              <CardHeader sx={{ pb: '10px' }} title={issue.title} subheader={`# ${issue.number}`} />
              <CardContent sx={{ overflow: 'auto', maxHeight: 100, pt: '10px' }}>
                <Typography >{issue.body}</Typography>
              </CardContent>
            </Card>
          }/>
      ))}
    </Tabs>
  )
}
