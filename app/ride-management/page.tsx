"use client"

import SearchBox from '@/components/SearchBox'
import TripDetails from '@/components/TripDetails'
import { statesList } from '@/lib/statesList'
import { tempRideData } from '@/lib/tempData'
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

const RideManagement = () => {
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [page, setPage] = React.useState<number>(0);
	const [pageSize, setPageSize] = React.useState<number>(10)
	const [tripData, setTripData] = React.useState<any[]>([])
	const [loader, setLoader] = React.useState<boolean>(false);
	const [stateDetails, setStateDetails] = React.useState<string>('state')

	const handleSearch = (value: string) => {
		setSearchValue(value);
	}

	const handleStateDetails = (e: any) => {
		setStateDetails(e.target.value);
	}

	const getTripDetails = async () => {
		setLoader(true)
		try {
			setTimeout(() => {
				setTripData(tempRideData)
				setLoader(false);
			}, 1000);
		} catch (error) {
			console.error(error);
			setLoader(false);
		}

	}

	React.useEffect(() => {
		getTripDetails()
	}, []);

	return (
		<Box sx={{ height: "100vh", overflowY: "scroll" }}>
			<Typography variant='h5'>Ride Management</Typography>
			<Box sx={{ mt: 2, display: "flex" }}>
				<SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={stateDetails}
					placeholder='State'
					onChange={handleStateDetails}
					sx={{ background: "#fff", border: "1px solid #fff", width: "200px", borderRadius: "10px", '&:hover': { border: 'none' }, '&:focus': { border: 'none' } }}
				>
					{statesList.map(item => <MenuItem value={item.name}>{item.name}</MenuItem>)}
				</Select>
			</Box>
			<Box sx={{ mt: 2 }}>
				{loader ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<CircularProgress />
				</Box> : tripData && tripData.length > 0 ? <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "20px" }}>{tripData.map(item => (
					<TripDetails key={item.tripId} data={item} />
				))}</Box> : <Box>No Data</Box>}
			</Box>
		</Box>
	)
}

export default RideManagement