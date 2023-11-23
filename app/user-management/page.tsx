"use client"

import ActionsMenu from '@/components/ActionMenu'
import DataTable from '@/components/DataTable'
import SearchBox from '@/components/SearchBox'
import { tempUserData } from '@/lib/tempData'
import { Avatar, Box, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React from 'react'

const UserManagement = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [rows, setRows] = React.useState<any[]>([])
  const [loader, setLoader] = React.useState<boolean>(false);

  const handleEditUser = (id: string) => {
		alert(id)
	}

	const handleDeleteUser = (id: string) => {
		alert(id)
	}

	const options = [
		{
			label: "Edit User",
			handler: handleEditUser
		},
		{
			label: "Delete User",
			handler: handleDeleteUser
		}
	]

  const columns: GridColDef[] = [
    { field: 'sno', headerName: '', width: 20 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', flex: 0.5 },
    {
      field: 'fullName', headerName: 'Full Name', flex: 1.5,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="John" src={params.row.avatar} id="avatar" sx={{ mr: 2 }} />
          {params.row.fullName}
        </div>
      ),
    },
    { field: 'mobile', headerName: 'Mobile Number', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'dateCreated', headerName: 'Date Created', width: 150 },
    { field: 'lastLogin', headerName: 'Last Login', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <ActionsMenu id={params.row.id} options={options} />
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

  const getDriversDetails = async () => {
    setLoader(true)
    try {
      setTimeout(() => {
        setRows(tempUserData)
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }

  }

  React.useEffect(() => {
    getDriversDetails()
  }, []);

  return (
    <Box>
      <Typography variant='h5'>User Management</Typography>
      <Box sx={{ mt: 2 }}>
        <SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
      </Box>
      <Box sx={{ mt: 2 }}></Box>
      <DataTable columns={columns} rows={rows} page={page} pageSize={pageSize} loader={loader} checkboxEnables={false} />
    </Box>
  )
}

export default UserManagement