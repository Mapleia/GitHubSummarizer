import React, { useState, useEffect } from 'react'

import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RepoID } from 'features/repository/repositorySlice'
import { RootState } from 'app/store'

type ActivateProps = {
  activate: ActionCreatorWithPayload<boolean, string>
}

interface InputLinkProps extends ActivateProps {
  update: ActionCreatorWithPayload<string, string>
  select: (state: RootState) => RepoID['repo' | 'owner']
  label: string
  submit?: boolean
}

export function InputLink ({ label, activate, select, update, submit }: InputLinkProps) {
  const dispatch = useAppDispatch()
  const subject = useAppSelector(select)
  const [input, setInput] = useState<string>(subject.payload)

  useEffect(() => {
    if (submit && input !== '') dispatch(update(input))
  }, [submit])

  if (!subject.active) return (<Link href="#">{subject.payload}</Link>)
  return (
    <TextField
      label={label}
      value={input}
      required
      size="small"
      variant="outlined"
      onBlur={() => {
        if (input !== '') {
          dispatch(update(input))
        }
        dispatch(activate(false))
      }}
      onChange={(e) => setInput(e.target.value)}
    />
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
