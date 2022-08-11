import React, { useState } from 'react'

import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RepoID } from 'features/repository/repositorySlice'
import { RootState } from 'app/store'

type ActivateProps = {
  activate: ActionCreatorWithPayload<boolean, string>
}

type SelectProps = {
  select: (state: RootState) => RepoID['repo' | 'owner']
}

type UpdateProps = {
  update: ActionCreatorWithPayload<string, string>
}

export function InputLink ({ activate, select, update }: (ActivateProps & SelectProps & UpdateProps)) {
  const dispatch = useAppDispatch()
  const subject = useAppSelector(select)
  const [input, setInput] = useState('')

  return (
    <ClickAwayListener onClickAway={() => {
      dispatch(activate(false))
      dispatch(update(input))
    }}>
      {subject.active || !subject.payload
        ? <TextField onChange={(e) => setInput(e.target.value)}/>
        : <Link href="#">{subject.payload}</Link>}
    </ClickAwayListener>
  )
}

export function EditButton (props: ActivateProps) {
  const dispatch = useAppDispatch()
  return (
    <IconButton
      onClick={() => dispatch(props.activate(true))}
    ><EditIcon /></IconButton>
  )
}
