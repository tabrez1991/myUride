"use client"

import SearchBox from '@/components/SearchBox'
import TripDetails from '@/components/TripDetails'
import { tempRideData } from '@/lib/tempData'
import { activateTrip, deactivateTrip, getStates, getTrips, logout } from '@/utils'
import { Box, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ERROR, SUCCESS } from '@/lib/constants'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { statesList } from '@/lib/statesList'
import { InView } from "react-intersection-observer";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import PaginatedTable from '@/components/table/PaginatedTable'
import { HeadCell } from '@/components/table/table'
import { formatDate, formatDateTime } from '@/lib/formatDate'
import ActionsMenu from '@/components/ActionMenu'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
	props,
	ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

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

const RideManagement = () => {
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [page, setPage] = React.useState<number>(1);
	const [pageSize, setPageSize] = React.useState<number>(10)
	const [pageTotal, setPageTotal] = React.useState<number>(100)
	const [tripData, setTripData] = React.useState<any[]>([])
	const [loader, setLoader] = React.useState<boolean>(false);
	const [stateDetails, setStateDetails] = React.useState<string>(' ')
	const [stateList, setStateList] = React.useState<any[]>([])
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertType, setAlertType] = React.useState<AlertColor>('success')
	const [alertMsg, setAlertMsg] = React.useState('')
	const [isDelete, setIsDelete] = React.useState<boolean>(false);
	const [deletedDetails, setDeletedDetails] = React.useState<any>()
	const [selectedId, setSelectedId] = React.useState<string>('')
	const [render, setRender] = React.useState<boolean>(false);


	const router = useRouter()

	const handleActive = async (dataDetails: any) => {
		setLoader(true)
		try {
			const result = await activateTrip(dataDetails.tripId);
			const { data, error } = result;
			if (data) {
				setRender(!render)
				setLoader(false);
				handleDenied();
				handleAlert(data.userId, "Trip Completed Successfully", SUCCESS);
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
				// handleLogout()
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}
	}


	const handleDeactive = (data: any) => {
		setDeletedDetails(data);
		setSelectedId(data.username);
		setIsDelete(true);
	}

	const options = [
		{
			label: "Complete Trip",
			handler: handleActive
		},
		{
			label: "Cancel Trip",
			handler: handleDeactive
		}
	]


	const handleSearch = (value: string) => {
		setPage(1)
		setSearchValue(value);
	}

	const handleStateDetails = (e: any) => {
		setPage(1)
		setStateDetails(e.target.value);
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

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage + 1);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(1);
	};

	const handleDenied = () => {
		setDeletedDetails(null);
		setSelectedId('');
		setIsDelete(false);
	}

	const handleAccept = async () => {
		setLoader(true)
		try {
			const result = await deactivateTrip(deletedDetails.tripId);
			const { data, error } = result;
			if (data) {
				setRender(!render)
				setLoader(false);
				handleDenied();
				handleAlert(data.userId, "Trip Cancelled Successfully", SUCCESS);
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
				// handleLogout()
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}
	}

	const calculateStartingSerialNumber = () => {
		return (page - 1) * pageSize + 1;
	};

	const getTripDetails = async () => {
		setLoader(true)
		setTripData([])
		try {
			const tempRow: any = [];
			const result = await getTrips(page, pageSize, stateDetails.trim(), searchValue.trim());
			const { data, error } = result;
			if (data) {
				if (data.data.length > 0) {
					data.data.forEach((element: any, i: number) => {
						tempRow.push({
							id: calculateStartingSerialNumber() + i,
							tripId: element?._id,
							status: element?.status,
							country: 'USA',
							source: element?.pickup_location,
							destination: element?.destination_location,
							seatsLeft: element?.seat_left_need,
							trip: element?.trip,
							amount: element?.amount,
							tripDistance: element?.trip_distance,
							tripTime: element?.trip_time,
							departDateTime: element?.depart_date_time,
							returnDateTime: element?.return_date_time,
							numbersOfRiders: element?.number_of_riders,
							numberOfBags: element?.number_of_bags,
							specialRequest: element?.special_request,
							createdDate: element?.created_date
						})
					});
					setPageTotal(data?.metadata?.total)
					setTripData(tempRow)
					setLoader(false);
				} else {
					setTripData(tempRow)
					setLoader(false);
				}
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
				// handleLogout()
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}
	}


	const getStatesList = async () => {
		setLoader(true)
		try {
			const result = await getStates();
			const { data, error } = result;
			if (data) {
				setStateList(data)
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
		getTripDetails()
	}, [stateDetails, searchValue, page, pageSize, render]);

	React.useEffect(() => {
		getStatesList()
	}, []);

	return (
		<Box sx={{ height: "100vh", overflowY: "scroll" }}>
			<Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
					{alertMsg}
				</Alert>
			</Snackbar>
			<Typography variant='h5'>Trips Management</Typography>
			<Box sx={{ mt: 2, display: "flex" }}>
				<SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={stateDetails}
					placeholder='State'
					size='small'
					onChange={handleStateDetails}
					sx={{ background: "#fff", border: "1px solid #fff", width: "200px", borderRadius: "10px", '&:hover': { border: 'none' }, '&:focus': { border: 'none' } }}
				>
					<MenuItem value=' '>Select State</MenuItem>
					{stateList.map(item => <MenuItem key={item.state} value={item.state}>{item.state}{" "}{item.code}</MenuItem>)}
				</Select>
			</Box>
			<Box sx={{ mt: 2 }}>
				{loader ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<CircularProgress />
				</Box> : <Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ whiteSpace: "nowrap" }}>S No</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Trip Id</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }} >Pickup Location</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Drop Location</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>No. of Seat Left</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Trip</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Amount</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Trip Distance</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Trip Time</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Depart</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Return</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>No. of Riders</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>No. of Bags</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Special Request</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Created Date</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tripData.map((row, i) => (
									<TableRow
										key={row._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell>{row.id}</TableCell>
										<TableCell component="th" scope="row">
											{row.tripId?.trim()}
										</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.source?.trim()}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.destination?.trim()}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{<Chip label={row.status === 5 ? 'completed'.toLocaleUpperCase() : row.status === 4 ? 'cancelled'.toLocaleUpperCase() : 'upcoming'.toLocaleUpperCase()} color={row.status === 5 ? 'success' : row.status === 4 ? 'error' : 'primary'} />}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.seatsLeft}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{<Chip label={row.trip.toString().toUpperCase()} style={{
											backgroundColor: row.trip === 'oneway' ? 'orange' : 'purple',
											color: 'white',
										}}
										/>}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.amount}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.tripDistance?.trim()}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.trip_time?.trim()}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{formatDateTime(row.departDateTime)}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{formatDateTime(row.returnDateTime)}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.numbersOfRiders}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.numberOfBags}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{row.specialRequest?.trim()}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>{formatDateTime(row.createdDate)}</TableCell>
										<TableCell sx={{ whiteSpace: "nowrap" }}>
											{row.status === 0 && <ActionsMenu id={row} options={options} close={!isDelete} />}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<TablePagination
							component="div"
							count={pageTotal}
							page={page - 1}
							onPageChange={handleChangePage}
							rowsPerPage={pageSize}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableContainer>
				</Box>}

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
							<Typography sx={{ fontFamily: 'Source Sans Pro', fontWeight: 400, fontSize: '1.25rem', mt: 2 }}>Do you want to deactivate user {deletedDetails?.fullname}</Typography>
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
		</Box>
	)
}

export default RideManagement

function deleteTrip(tripId: any) {
	throw new Error('Function not implemented.')
}
