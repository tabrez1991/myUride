import DataTable from '@/components/DataTable'
import { Box, Typography } from '@mui/material'
import React from 'react'


const UserManagement = () => {



  return (
    <Box>
      <Typography variant='h5'>User Management</Typography>
      <Box sx={{ mt: 2 }}></Box>
      <DataTable />
    </Box>
  )
}

export default UserManagement