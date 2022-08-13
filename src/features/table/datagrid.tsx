import React, {
  // useEffect,
  useState
} from 'react'
import {
  DataGrid, GridToolbar, GridColDef,
  GridValueGetterParams, GridValueFormatterParams,
  GridSelectionModel,
  GridRowId
} from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { GitHubIssue, selectStatus, updateSelected } from 'features/repository/repositorySlice'
import { setIssue, setOpen } from 'features/details/detailsSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { formatDate } from 'common/utils'

// type subtype = GitHubIssue['number']

interface TableProps {
  rows: GitHubIssue[]
}

export default function Table (props: TableProps) {
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])

  const columns: GridColDef<GitHubIssue>[] = [
    { field: 'id', headerName: 'ID', flex: 0.25, sortable: true },
    { field: 'number', headerName: 'Issue #', flex: 0.2, sortable: true },
    {
      field: 'repository_url',
      headerName: 'Repo',
      flex: 0.3,
      sortable: true,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        const url = params.value
        const splitArr = url.split('/')
        return splitArr[splitArr.length - 1]
      }
    },
    {
      field: 'state',
      headerName: 'Status',
      sortable: true,
      flex: 0.22,
      renderCell: (params) => {
        switch (params.value) {
        case 'closed':
          return <Chip color='secondary' variant="outlined" label="Closed"/>
        default:
          return <Chip color="primary" variant="outlined" label="Open" />
        }
      },
      sortComparator: (v1, v2) => {
        if (v1 === 'closed') return -1
        else return 1
      }
    },
    { field: 'title', headerName: 'Title', flex: 0.6 },
    {
      field: 'details',
      headerName: 'See Details',
      flex: 0.24,
      renderCell: (params) => {
        const issue = params.row

        return <Button onClick={() => {
          dispatch(setIssue(issue))
          dispatch(setOpen(true))
        }}>Details</Button>
      }
    },
    {
      field: 'updated_at',
      headerName: 'Last Updated',
      sortable: true,
      flex: 0.26,
      valueGetter: (params: GridValueGetterParams<any, GitHubIssue>) => new Date(params.row.updated_at),
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return formatDate(params.value)
      }
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      sortable: true,
      flex: 0.26,
      valueGetter: (params: GridValueGetterParams<any, GitHubIssue>) => new Date(params.row.created_at),
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return formatDate(params.value)
      }
    },
    { field: 'comments', flex: 0.3, headerName: 'Comments', sortable: true }
  ]
  return (
    <DataGrid
      autoHeight
      loading={status === 'loading'}
      components={{ Toolbar: GridToolbar }}
      rows={props.rows}
      columns={columns}
      rowsPerPageOptions={[3, 10, 30, 100]}
      checkboxSelection
      sx={{ width: '100%', height: 'xl', minHeight: 100 }}
      onSelectionModelChange={(model) => {
        const found = model.reduce((result: GitHubIssue[], select: GridRowId) => {
          const row = props.rows.find((row) => row.id === select as number)
          if (row) result.push(row)
          return result
        }, [])

        setSelectionModel(model)
        dispatch(updateSelected(found))
      }}
      selectionModel={selectionModel}
    />
  )
}
