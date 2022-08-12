import React from 'react'
import {
  DataGrid, GridToolbar, GridColDef,
  GridValueGetterParams, GridValueFormatterParams
} from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'

import { GitHubIssue, selectStatus } from 'features/repository/repositorySlice'
import { useAppSelector } from 'app/hooks'

function padTo2Digits (num) {
  return num.toString().padStart(2, '0')
}

function formatDate (date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('/')
}

// type subtype = GitHubIssue['number']
const columns: GridColDef[] = [
  { field: 'number', headerName: 'Issue Number', flex: 0.3, sortable: true },
  {
    field: 'state',
    headerName: 'Status',
    sortable: true,
    flex: 0.2,
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
    field: 'updated_at',
    headerName: 'Last Updated',
    sortable: true,
    flex: 0.3,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.updated_at),
    valueFormatter: (params: GridValueFormatterParams<Date>) => {
      return formatDate(params.value)
    }
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    sortable: true,
    flex: 0.3,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.created_at),
    valueFormatter: (params: GridValueFormatterParams<Date>) => {
      return formatDate(params.value)
    }
  },
  { field: 'comments', flex: 0.3, headerName: 'Number of Comments', sortable: true }
]

interface TableProps {
  rows: GitHubIssue[]
}

export default function Table (props: TableProps) {
  const status = useAppSelector(selectStatus)

  return (
    <DataGrid
      autoHeight
      loading={status === 'loading'}
      components={{ Toolbar: GridToolbar }}
      rows={props.rows}
      columns={columns}
      rowsPerPageOptions={[3, 10, 30]}
      checkboxSelection
      sx={{ width: '100%', height: 'xl', minHeight: 100 }}
    />
  )
}
