"use client"

import ActionsMenu from '@/components/ActionMenu'
import DataTable from '@/components/DataTable'
import SearchBox from '@/components/SearchBox'
import { activateDriver, deleteDriver, getDrivers, logout } from '@/utils'
import { Avatar, Box, Button, Chip, Modal, Snackbar, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ERROR, SUCCESS } from '@/lib/constants'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import EditDriver from '@/components/EditDriver'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxHeight: '90vh',
	width: '580px',
	height: '174px',
	bgcolor: 'background.paper',
	borderRadius: '10px',
	border: 'none !important',
	p: 4,
	outline: 'none',
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
	props,
	ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);


const DriverManagement = () => {
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [page, setPage] = React.useState<number>(0);
	const [pageSize, setPageSize] = React.useState<number>(10)
	const [rows, setRows] = React.useState<any[]>([])
	const [loader, setLoader] = React.useState<boolean>(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertType, setAlertType] = React.useState<AlertColor>('success')
	const [alertMsg, setAlertMsg] = React.useState('')
	const [render, setRender] = React.useState<boolean>(false);
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	const [editData, setEditData] = React.useState<any>();
	const [selectedId, setSelectedId] = React.useState<string>('')
	const [deletedDetails, setDeletedDetails] = React.useState<any>()
	const [isDelete, setIsDelete] = React.useState<boolean>(false);

	const router = useRouter()

	const handleDenied = () => {
		setDeletedDetails(null);
		setSelectedId('');
		setIsDelete(false);
	}

	const handleAccept = async () => {
		setLoader(true)
		try {
			const result = await deleteDriver(deletedDetails.email);
			const { data, error } = result;
			if (data) {
				setRender(!render)
				setLoader(false);
				handleDenied();
				handleAlert(data.userId, "Driver Deactivated Successfully", SUCCESS);
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
				handleLogout()
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}
	}

	const handleEditDriver = (data: any) => {
		setSelectedId(data.driverId);
		setEditData(data);
		setIsEdit(true);
	}

	const handleDeleteDriver = (data: any) => {
		setDeletedDetails(data);
		setSelectedId(data.driverId);
		setIsDelete(true);
	}

	const handleActivate = async (activeDetails: any) => {
		setLoader(true)
		try {
			const result = await activateDriver(activeDetails?.email);
			const { data, error } = result;
			if (data) {
				setRender(!render)
				setLoader(false);
				handleDenied();
				handleAlert(data.userId, "Driver Activated Successfully", SUCCESS);
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
				handleLogout()
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}
	}

	const options = [
		{
			label: "Edit Driver",
			handler: handleEditDriver
		},
		{
			label: "Deactivate Driver",
			handler: handleDeleteDriver
		}
	]

	const options2 = [
		{
			label: "Edit Driver",
			handler: handleEditDriver
		},
		{
			label: "Activate Driver",
			handler: handleActivate
		}
	]

	const columns: GridColDef[] = [
		{ field: 'driverId', headerName: 'Driver Id', width: 250 },
		{
			field: 'driver',
			headerName: 'Firstname',
			flex: 1.5,
			renderCell: (params) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Avatar alt={params.row.driver} src={params.row.avatar} id="avatar" sx={{ mr: 2 }} />
					{params.row.driver}
				</div>
			),
		},
		{ field: 'middleName', headerName: 'Middle Name', flex: 1 },
		{ field: 'lastName', headerName: 'Last Name', flex: 1 },
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
			field: 'status', headerName: 'Status', width: 120,
			renderCell: (params) => (
				<Chip label={params.row.status ? "ACTIVE" : "INACTIVE"} color={params.row.status === 1 ? 'success' : 'primary'} />
			),
		},
		{
			field: 'actions',
			headerName: '',
			width: 1,
			renderCell: (params) => (
				<ActionsMenu id={params.row} options={params.row.status === 1 ? options : options2} close={!isEdit && !isDelete}/>
			),
		},
	];

	// const tempData = [
	// 	{ id: "1", driverId: "DVR001", driver: 'Jon Snow', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000", avatar: 'https://mighty.tools/mockmind-api/content/human/1.jpg' },
	// 	{ id: "2", driverId: "DVR002", driver: 'Cersei Lannister', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000", avatar: 'https://mighty.tools/mockmind-api/content/human/2.jpg' },
	// 	{ id: "3", driverId: "DVR003", driver: 'Jaime Lannister', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000", avatar: 'https://mighty.tools/mockmind-api/content/human/3.jpg' },
	// 	{ id: "4", driverId: "DVR004", driver: 'Arya Stark', mobileNumber: "9876512345", ratings: 4, totalTrips: 15, totalEarnings: "₹ 20000", avatar: 'https://mighty.tools/mockmind-api/content/human/4.jpg' },
	// 	{ id: "5", driverId: "DVR005", driver: 'Daenerys Targaryen', mobileNumber: "9876123450", ratings: 3.5, totalTrips: 30, totalEarnings: "₹ 3000", avatar: 'https://mighty.tools/mockmind-api/content/human/5.jpg' },
	// 	{ id: "6", driverId: "DVR006", driver: 'Melisandre', mobileNumber: "9870123456", ratings: 4, totalTrips: 23, totalEarnings: "₹ 25000", avatar: 'https://mighty.tools/mockmind-api/content/human/6.jpg' },
	// 	{ id: "7", driverId: "DVR007", driver: 'Ferrara Clifford', mobileNumber: "9812345670", ratings: 3, totalTrips: 55, totalEarnings: "₹ 23000", avatar: 'https://mighty.tools/mockmind-api/content/human/7.jpg' },
	// 	{ id: "8", driverId: "DVR008", driver: 'Rossini Frances', mobileNumber: "9801234567", ratings: 5, totalTrips: 56, totalEarnings: "₹ 6000", avatar: 'https://mighty.tools/mockmind-api/content/human/8.jpg' },
	// 	{ id: "9", driverId: "DVR009", driver: 'Harvey Roxie', mobileNumber: "9123456780", ratings: 4.9, totalTrips: 32, totalEarnings: "₹ 34000", avatar: 'https://mighty.tools/mockmind-api/content/human/9.jpg' },
	// 	{ id: "10", driverId: "DVR010", driver: 'John Doe', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000", avatar: 'https://mighty.tools/mockmind-api/content/human/10.jpg' },
	// 	{ id: "11", driverId: "DVR011", driver: 'Alice Johnson', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000", avatar: 'https://mighty.tools/mockmind-api/content/human/11.jpg' },
	// 	{ id: "12", driverId: "DVR012", driver: 'Bob Smith', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000", avatar: 'https://mighty.tools/mockmind-api/content/human/12.jpg' },
	// 	{ id: "13", driverId: "DVR013", driver: 'Emma White', mobileNumber: "9876512345", ratings: 4, totalTrips: 15, totalEarnings: "₹ 20000", avatar: 'https://mighty.tools/mockmind-api/content/human/13.jpg' },
	// 	{ id: "14", driverId: "DVR014", driver: 'David Brown', mobileNumber: "9876123450", ratings: 3.5, totalTrips: 30, totalEarnings: "₹ 3000", avatar: 'https://mighty.tools/mockmind-api/content/human/14.jpg' },
	// 	{ id: "15", driverId: "DVR015", driver: 'Sophia Johnson', mobileNumber: "9870123456", ratings: 4, totalTrips: 23, totalEarnings: "₹ 25000", avatar: 'https://mighty.tools/mockmind-api/content/human/15.jpg' },
	// 	{ id: "16", driverId: "DVR016", driver: 'Michael Lee', mobileNumber: "9812345670", ratings: 3, totalTrips: 55, totalEarnings: "₹ 23000", avatar: 'https://mighty.tools/mockmind-api/content/human/16.jpg' },
	// 	{ id: "17", driverId: "DVR017", driver: 'Olivia Davis', mobileNumber: "9801234567", ratings: 5, totalTrips: 56, totalEarnings: "₹ 6000", avatar: 'https://mighty.tools/mockmind-api/content/human/17.jpg' },
	// 	{ id: "18", driverId: "DVR018", driver: 'William Martin', mobileNumber: "9123456780", ratings: 4.9, totalTrips: 32, totalEarnings: "₹ 34000", avatar: 'https://mighty.tools/mockmind-api/content/human/18.jpg' },
	// 	{ id: "19", driverId: "DVR019", driver: 'Ella Rodriguez', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000", avatar: 'https://mighty.tools/mockmind-api/content/human/19.jpg' },
	// 	{ id: "20", driverId: "DVR020", driver: 'Jackson Taylor', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000", avatar: 'https://mighty.tools/mockmind-api/content/human/20.jpg' },
	// 	{ id: "21", driverId: "DVR021", driver: 'Sophie Turner', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000", avatar: 'https://mighty.tools/mockmind-api/content/human/21.jpg' },
	// 	{ id: "22", driverId: "DVR022", driver: 'Daniel Evans', mobileNumber: "9876512345", ratings: 4, totalTrips: 15, totalEarnings: "₹ 20000", avatar: 'https://mighty.tools/mockmind-api/content/human/22.jpg' },
	// 	{ id: "23", driverId: "DVR023", driver: 'Grace Moore', mobileNumber: "9876123450", ratings: 3.5, totalTrips: 30, totalEarnings: "₹ 3000", avatar: 'https://mighty.tools/mockmind-api/content/human/23.jpg' },
	// 	{ id: "24", driverId: "DVR024", driver: 'Benjamin Foster', mobileNumber: "9870123456", ratings: 4, totalTrips: 23, totalEarnings: "₹ 25000", avatar: 'https://mighty.tools/mockmind-api/content/human/24.jpg' },
	// 	{ id: "25", driverId: "DVR025", driver: 'Ava Peterson', mobileNumber: "9812345670", ratings: 3, totalTrips: 55, totalEarnings: "₹ 23000", avatar: 'https://mighty.tools/mockmind-api/content/human/25.jpg' },
	// 	{ id: "26", driverId: "DVR026", driver: 'Henry Garcia', mobileNumber: "9801234567", ratings: 5, totalTrips: 56, totalEarnings: "₹ 6000", avatar: 'https://mighty.tools/mockmind-api/content/human/26.jpg' },
	// 	{ id: "27", driverId: "DVR027", driver: 'Lily Ward', mobileNumber: "9123456780", ratings: 4.9, totalTrips: 32, totalEarnings: "₹ 34000", avatar: 'https://mighty.tools/mockmind-api/content/human/27.jpg' },
	// 	{ id: "28", driverId: "DVR028", driver: 'Ethan Johnson', mobileNumber: "9876543210", ratings: 4, totalTrips: 10, totalEarnings: "₹ 2000", avatar: 'https://mighty.tools/mockmind-api/content/human/28.jpg' },
	// 	{ id: "29", driverId: "DVR029", driver: 'Oliver Baker', mobileNumber: "9876543120", ratings: 4.5, totalTrips: 20, totalEarnings: "₹ 30000", avatar: 'https://mighty.tools/mockmind-api/content/human/29.jpg' },
	// 	{ id: "30", driverId: "DVR030", driver: 'Charlotte Clark', mobileNumber: "9876541230", ratings: 5, totalTrips: 12, totalEarnings: "₹ 5000", avatar: 'https://mighty.tools/mockmind-api/content/human/30.jpg' }
	// ];

	const handleSearch = (value: string) => {
		setSearchValue(value);
	}

	const handleAlert = (id: string, msg: string, type: AlertColor) => {
		setOpenAlert(true)
		setAlertType(type)
		setAlertMsg(msg)
	}

	const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAlert(false);
	};

	const handleLogout = async () => {
		const result = await logout();
		const { data, error } = result;
		if (data) {
			deleteCookie('accessToken');
			deleteCookie('refreshToken');
			deleteCookie('email');
			router.push('/login')
		} else {
			handleAlert(error.statusCode, error.message, ERROR);
		}
	}

	const getDriversDetails = async () => {
		setLoader(true)
		try {
			const tempRow: any = [];
			const result = await getDrivers(page, pageSize, searchValue);
			const { data, error } = result;
			if (data) {
				data.forEach((element: any, index: number) => {
					tempRow.push({
						id: index + 1,
						driverId: element?.profile_id,
						driver: element?.backgroundCheck?.legal_first_name,
						middleName: element?.backgroundCheck?.legal_middle_name,
						lastName: element?.backgroundCheck?.legal_last_name,
						avatar: element?.profile_photo,
						email: element?.user?.email,
						mobileNumber: element?.mobile_no,
						ratings: element?.rating,
						totalTrips: element?.totalTrips,
						totalEarnings: element?.totalTripAmount,
						status: element?.user?.status
					})
				});
				setRows(tempRow)
				setLoader(false);
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
				handleLogout()
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}

	}

	React.useEffect(() => {
		getDriversDetails()
	}, [page, pageSize, searchValue, render]);


	return (
		<Box sx={{ height: "100vh", overflowY: "scroll" }}>
			<Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
					{alertMsg}
				</Alert>
			</Snackbar>
			<Typography variant='h5'>Driver Management</Typography>
			<Box sx={{ mt: 2 }}>
				<SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
			</Box>
			<Box sx={{ mt: 2, width: "100%" }}>
				<DataTable
					columns={columns}
					rows={rows}
					page={page}
					pageSize={pageSize}
					loader={loader}
					checkboxEnables={false} />
			</Box>
			{isEdit && <EditDriver isEdit={isEdit} handleClose={() => setIsEdit(false)} data={editData} handleSuccess={() => setRender(!render)} />}
			{isDelete && <Modal
				open={isDelete}
				onClose={() => setIsDelete(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ border: 'none' }}
			>
				<Box sx={style}>
					<Typography
						color="info.main"
						sx={{
							fontSize: '1.5rem',
							textAlign: 'right',
							position: 'fixed',
							right: '15px',
							top: '10px',
						}}
						onClick={() => setIsDelete(false)}
					>
						<i className="ri-close-fill" style={{ cursor: 'pointer' }} />
					</Typography>
					<Box sx={{ textAlign: 'left' }}>
						<Typography sx={{ fontFamily: 'Source Sans Pro', fontWeight: 400, fontSize: '1.25rem', mt: 2 }}>Do you want to deactivate driver {deletedDetails?.fullname}</Typography>
						<Box sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end' }}>
							<Button variant='outlined' sx={{ textTransform: 'none' }} onClick={handleDenied}>No</Button>
							<Button variant='contained' sx={{ ml: 2, textTransform: 'none' }} onClick={handleAccept}>Yes</Button>
						</Box>
					</Box>
					<br />
					<br />
				</Box>
			</Modal>}
		</Box>

	)
}

export default DriverManagement