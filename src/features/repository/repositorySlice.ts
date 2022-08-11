import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import octokit from 'services/repoAPI'
import { Endpoints } from '@octokit/types'
import { RootState } from 'app/store'

type Subject = {
  payload: string | null,
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
  issues: GitHubIssue[][],
  page: number,
}

const initialState: RepositoryState = {
  status: 'loading',
  repo: { payload: null, active: false },
  owner: { payload: null, active: false },
  issues: [],
  page: 1
}

interface RepoIDNonNull {
  repo: { payload: string, active: boolean},
  owner: { payload: string, active: boolean}
}

export const repoAsync = createAsyncThunk(
  '/repository/fetchIssues',
  async (_: any, { getState }) => {
    const state = getState().repo as RepoIDNonNull
    const { repo, owner } = state
    const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
      repo: repo.payload,
      owner: owner.payload,
      per_page: 100
    })

    const allIssues = []
    for await (const { data: issues } of iterator) {
      allIssues.push(issues)
    }
    return allIssues
  },
  {
    condition: (id: RepoID) => id.repo !== null && id.owner !== null
  }
)

const repoSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    activateRepo: (state, action: PayloadAction<boolean>) => {
      state.repo.active = !state.repo.active
    },
    activateOwner: (state, action: PayloadAction<boolean>) => {
      state.owner.active = !state.owner.active
    },
    updateRepo: (state, action: PayloadAction<string>) => {
      state.repo.payload = action.payload
    },
    updateOwner: (state, action: PayloadAction<string>) => {
      state.owner.payload = action.payload
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
      .addCase(repoAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(repoAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.issues = action.payload
      })
      .addCase(repoAsync.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { activateRepo, activateOwner, updateRepo, updateOwner, nextPage, previousPage, goToPage } = repoSlice.actions

export const selectIssues = (state: RootState) => state.repo.issues
export const selectPage = (state: RootState) => state.repo.page
export const selectOwner = (state: RootState) => state.repo.owner
export const selectRepo = (state: RootState) => state.repo.repo

export default repoSlice.reducer
