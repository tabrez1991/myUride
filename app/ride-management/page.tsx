"use client"

import SearchBox from '@/components/SearchBox'
import { Box, Typography } from '@mui/material'
import React from 'react'

const RideManagement = () => {
	const [searchValue, setSearchValue] = React.useState<string>('');
	const handleSearch = (value: string) => {
		setSearchValue(value);
	}

return (
	<Box sx={{ height: "100vh", overflowY: "scroll" }}>
		<Typography variant='h5'>Ride Management</Typography>
		<Box sx={{ mt: 2 }}>
			<SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
		</Box>
		<Box sx={{ mt: 2 }}></Box>

	</Box>
)
}

export default RideManagement