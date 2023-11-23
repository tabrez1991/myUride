"use client"

import ActionsMenu from '@/components/ActionMenu'
import DataTable from '@/components/DataTable'
import SearchBox from '@/components/SearchBox'
import { Avatar, Box, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React from 'react'


const DriverManagement = () => {
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [page, setPage] = React.useState<number>(0);
	const [pageSize, setPageSize] = React.useState<number>(10)
	const [rows, setRows] = React.useState<any[]>([])
	const [loader, setLoader] = React.useState<boolean>(false);

	const handleEditDriver = (id: string) => {
		alert(id)
	}

	const handleDeleteDriver = (id: string) => {
		alert(id)
	}

	const options = [
		{
			label: "Edit Driver",
			handler: handleEditDriver
		},
		{
			label: "Delete Driver",
			handler: handleDeleteDriver
		}
	]

	const columns: GridColDef[] = [
		{ field: 'sno', headerName: '', width: 20 },
		{ field: 'driverId', headerName: 'Driver Id', flex: 0.5 },
		{
			field: 'driver',
			headerName: 'Driver',
			flex: 1.5,
			renderCell: (params) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Avatar alt="John" src="https://media.licdn.com/dms/image/D5612AQHQjCIhei3GqA/article-cover_image-shrink_720_1280/0/1658755011921?e=2147483647&v=beta&t=cIOOsE4lON2tHucBa2lron2obdN0sGbaynuXnK_mq4k" id="avatar" sx={{ mr: 2 }} />
					{params.row.driver}
				</div>
			),
		},
		{ field: 'mobileNumber', headerName: 'Mobile Number', flex: 1 },
		{
			field: 'ratings',
			headerName: 'Ratings',
			flex: 1,
			renderCell: (params) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{Array.from({ length: params.value }, (_, index) => (
						<Typography key={index} sx={{ color: '#ffd700', fontSize: '20px' }}>
							<i className="ri-star-fill" />
						</Typography>
					))}
				</div>
			),
		},
		{ field: 'totalTrips', headerName: 'Total Trips', flex: 1 },
		{ field: 'totalEarnings', headerName: 'Total Earnings', flex: 1 },
		{
			field: 'actions',
			headerName: '',
			width: 120,
			renderCell: (params) => (
				<ActionsMenu id={params.row.driverId} options={options} />
			),
		},
	];

	const tempData = [
		{ id: "1", driverId: "DVR001", driver: 'Jon Snow', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000" },
		{ id: "2", driverId: "DVR002", driver: 'Cersei Lannister', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000" },
		{ id: "3", driverId: "DVR003", driver: 'Jaime Lannister', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000" },
		{ id: "4", driverId: "DVR004", driver: 'Arya Stark', mobileNumber: "9876512345", ratings: 4, totalTrips: 15, totalEarnings: "₹ 20000" },
		{ id: "5", driverId: "DVR005", driver: 'Daenerys Targaryen', mobileNumber: "9876123450", ratings: 3.5, totalTrips: 30, totalEarnings: "₹ 3000" },
		{ id: "6", driverId: "DVR006", driver: 'Melisandre', mobileNumber: "9870123456", ratings: 4, totalTrips: 23, totalEarnings: "₹ 25000" },
		{ id: "7", driverId: "DVR007", driver: 'Ferrara Clifford', mobileNumber: "9812345670", ratings: 3, totalTrips: 55, totalEarnings: "₹ 23000" },
		{ id: "8", driverId: "DVR008", driver: 'Rossini Frances', mobileNumber: "9801234567", ratings: 5, totalTrips: 56, totalEarnings: "₹ 6000" },
		{ id: "9", driverId: "DVR009", driver: 'Harvey Roxie', mobileNumber: "9123456780", ratings: 4.9, totalTrips: 32, totalEarnings: "₹ 34000" },
		{ id: "10", driverId: "DVR010", driver: 'John Doe', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000" },
		{ id: "11", driverId: "DVR011", driver: 'Alice Johnson', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000" },
		{ id: "12", driverId: "DVR012", driver: 'Bob Smith', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000" },
		{ id: "13", driverId: "DVR013", driver: 'Emma White', mobileNumber: "9876512345", ratings: 4, totalTrips: 15, totalEarnings: "₹ 20000" },
		{ id: "14", driverId: "DVR014", driver: 'David Brown', mobileNumber: "9876123450", ratings: 3.5, totalTrips: 30, totalEarnings: "₹ 3000" },
		{ id: "15", driverId: "DVR015", driver: 'Sophia Johnson', mobileNumber: "9870123456", ratings: 4, totalTrips: 23, totalEarnings: "₹ 25000" },
		{ id: "16", driverId: "DVR016", driver: 'Michael Lee', mobileNumber: "9812345670", ratings: 3, totalTrips: 55, totalEarnings: "₹ 23000" },
		{ id: "17", driverId: "DVR017", driver: 'Olivia Davis', mobileNumber: "9801234567", ratings: 5, totalTrips: 56, totalEarnings: "₹ 6000" },
		{ id: "18", driverId: "DVR018", driver: 'William Martin', mobileNumber: "9123456780", ratings: 4.9, totalTrips: 32, totalEarnings: "₹ 34000" },
		{ id: "19", driverId: "DVR019", driver: 'Ella Rodriguez', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000" },
		{ id: "20", driverId: "DVR020", driver: 'Jackson Taylor', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000" },
		{ id: "21", driverId: "DVR021", driver: 'Sophie Turner', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000" },
		{ id: "22", driverId: "DVR022", driver: 'Daniel Evans', mobileNumber: "9876512345", ratings: 4, totalTrips: 15, totalEarnings: "₹ 20000" },
		{ id: "23", driverId: "DVR023", driver: 'Grace Moore', mobileNumber: "9876123450", ratings: 3.5, totalTrips: 30, totalEarnings: "₹ 3000" },
		{ id: "24", driverId: "DVR024", driver: 'Benjamin Foster', mobileNumber: "9870123456", ratings: 4, totalTrips: 23, totalEarnings: "₹ 25000" },
		{ id: "25", driverId: "DVR025", driver: 'Ava Peterson', mobileNumber: "9812345670", ratings: 3, totalTrips: 55, totalEarnings: "₹ 23000" },
		{ id: "26", driverId: "DVR026", driver: 'Henry Garcia', mobileNumber: "9801234567", ratings: 5, totalTrips: 56, totalEarnings: "₹ 6000" },
		{ id: "27", driverId: "DVR027", driver: 'Lily Ward', mobileNumber: "9123456780", ratings: 4.9, totalTrips: 32, totalEarnings: "₹ 34000" },
		{ id: "28", driverId: "DVR028", driver: 'Ethan Johnson', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000" },
		{ id: "29", driverId: "DVR029", driver: 'Oliver Baker', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000" },
		{ id: "30", driverId: "DVR030", driver: 'Charlotte Clark', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000" }
	];

	const handleSearch = (value: string) => {
		setSearchValue(value);
	}

	const getDriversDetails = async () => {
		setLoader(true)
		try {
			setTimeout(() => {
				setRows(tempData)
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
		<Box sx={{ height: "100vh", overflowY: "scroll" }}>
			<Typography variant='h5'>Driver Management</Typography>
			<Box sx={{ mt: 2 }}>
				<SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
			</Box>
			<Box sx={{ mt: 2, width: "100%" }}>
				<DataTable columns={columns} rows={rows} page={page} pageSize={pageSize} loader={loader} checkboxEnables={false} />
			</Box>
		</Box>
		
	)
}

export default DriverManagement