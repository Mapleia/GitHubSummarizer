import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import octokit from 'features/repository/repoAPI'
import { Endpoints } from '@octokit/types'
import { RootState } from 'app/store'

type Subject = {
  payload: string,
  active: boolean
}

export interface RepoID {
  repo: Subject,
  owner:Subject
}

type ListReposIssueResponse = Endpoints['GET /repos/{owner}/{repo}/issues']['response'];

export type GitHubIssue = ListReposIssueResponse['data'][number]

export interface RepositoryState extends RepoID {
  status: 'loading' | 'failed' | 'idle',
  issues: GitHubIssue[],
  page: number,
  error: any,
}

const initialState: RepositoryState = {
  status: 'idle',
  repo: { payload: 'IssuesTest', active: true },
  owner: { payload: 'Mapleia', active: true },
  issues: [],
  page: 1,
  error: {}
}

interface RepoIDNonNull {
  repo: { payload: string, active: boolean},
  owner: { payload: string, active: boolean}
}

export const fetchIssues = createAsyncThunk(
  '/repository/fetchIssues',
  async (_: any, { getState }) => {
    const state = getState().repo as RepoIDNonNull
    const { repo, owner } = state
    console.info('Time to find issues')

    try {
      const options = octokit.rest.issues.listForRepo

      return octokit.paginate(options, {
        repo: repo.payload,
        owner: owner.payload,
        per_page: 40,
        state: 'all'
      })
    } catch (err) {
      console.error(err)
      throw new Error('Error with creating the iterator.')
    }
  },
  {
    condition: (_, api) => {
      const check = api.getState().repo
      return check.repo.payload.length > 0 && check.owner.payload.length > 0
    }
  }
)

const repoSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    activateRepo: (state, action: PayloadAction<boolean>) => {
      state.repo.active = action.payload
    },
    activateOwner: (state, action: PayloadAction<boolean>) => {
      state.owner.active = action.payload
    },
    updateRepo: (state, action: PayloadAction<string>) => {
      state.repo = { ...state.repo, payload: action.payload }
    },
    updateOwner: (state, action: PayloadAction<string>) => {
      state.owner = { ...state.owner, payload: action.payload }
    },
    nextPage: (state) => {
      state.page++
    },
    previousPage: (state) => {
      if (state.page > 1) {
        state.page--
      }
    },
    goToPage: (state, action: PayloadAction<number>) => {
      if (state.issues.length < action.payload) {
        state.page = state.issues.length
      }
      if (action.payload < 1) {
        state.page = 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        console.log('Its still loading...')
        state.status = 'loading'
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'idle'
        state.issues = action.payload
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
        state.issues = []
      })
  }
})

export const { activateRepo, activateOwner, updateRepo, updateOwner, nextPage, previousPage, goToPage } = repoSlice.actions

export const selectIssues = (state: RootState) => state.repo.issues
export const selectPage = (state: RootState) => state.repo.page
export const selectOwner = (state: RootState) => state.repo.owner
export const selectRepo = (state: RootState) => state.repo.repo
export const selectReady = (state: RootState) => state.repo.repo.payload && state.repo.owner.payload
export const selectStatus = (state: RootState) => state.repo.status

export default repoSlice.reducer
