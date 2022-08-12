import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import octokit from 'features/repository/repoAPI'
import { Endpoints } from '@octokit/types'
import { RootState } from 'app/store'
import { filterObjSet } from 'common/utils'

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
  error?: SerializedError,
  selected: GitHubIssue[],
}

const initialState: RepositoryState = {
  status: 'idle',
  repo: { payload: 'IssuesTest', active: false },
  owner: { payload: 'Mapleia', active: false },
  issues: [],
  page: 1,
  selected: []
}

export const fetchIssues = createAsyncThunk(
  '/repository/fetchIssues',
  async (_: any, { getState }) => {
    const { repo: state } = getState()

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
      const { repo: check } = api.getState()
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
    },
    updateSelected: (state, action: PayloadAction<GitHubIssue[]>) => {
      state.selected = filterObjSet(state.selected, action.payload, 'id')
    },
    clearError: (state) => {
      state.error = null
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
        state.issues = filterObjSet(state.issues, action.payload, 'id')
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
      })
  }
})

export const {
  activateRepo, updateRepo,
  activateOwner, updateOwner,
  nextPage, previousPage, goToPage,
  updateSelected, clearError
} = repoSlice.actions

export const selectIssues = (state: RootState) => state.repo.issues
export const selectPage = (state: RootState) => state.repo.page
export const selectOwner = (state: RootState) => state.repo.owner
export const selectRepo = (state: RootState) => state.repo.repo
export const selectReady = (state: RootState) => state.repo.repo.payload && state.repo.owner.payload
export const selectStatus = (state: RootState) => state.repo.status
export const selectSelected = (state: RootState) => state.repo.selected
export const selectError = (state: RootState) => state.repo.error

export default repoSlice.reducer
