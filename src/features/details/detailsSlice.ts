import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { GitHubIssue } from 'features/repository/repositorySlice'

export interface DetailState {
  issue?: GitHubIssue
  open: boolean
}

const initialState: DetailState = {
  open: false
}

const detailSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setIssue: (state, action: PayloadAction<GitHubIssue>) => {
      state.issue = action.payload
    }
  }
})

export const {
  setOpen, setIssue
} = detailSlice.actions

export const selectIssue = (state: RootState) => state.details.issue
export const selectOpen = (state: RootState) => state.details.open

export default detailSlice.reducer
