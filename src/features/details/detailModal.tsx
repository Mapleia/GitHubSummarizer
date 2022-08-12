import React from 'react'

import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectIssue, selectOpen, setOpen } from 'features/details/detailsSlice'

export default function DetailModal () {
  const issue = useAppSelector(selectIssue)
  const open = useAppSelector(selectOpen)
  const dispatch = useAppDispatch()

  if (issue) {
    return (
      <Dialog
        open={open}
        onClose={() => dispatch(setOpen(false))}
      >
        <DialogTitle>#{issue.number}: {issue.title}</DialogTitle>
        <DialogContent sx={{ flexDirection: 'row' }}>
          <Avatar alt={`avatar of ${issue.user.name}`} src={issue.user.avatar_url}/>
          <DialogContentText >{issue.body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link underline="hover" href={issue.repository_url}>See Repository</Link>
          <Link underline="hover" href={issue.comments_url}>See Comments</Link>
        </DialogActions>
      </Dialog>
    )
  }
}
