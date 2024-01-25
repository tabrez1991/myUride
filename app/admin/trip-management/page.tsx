"use client"

import SearchBox from '@/components/SearchBox'
import TripDetails from '@/components/TripDetails'
import { tempRideData } from '@/lib/tempData'
import { getStates, getTrips, logout } from '@/utils'
import { Box, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ERROR } from '@/lib/constants'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { statesList } from '@/lib/statesList'
import { InView } from "react-intersection-observer";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import PaginatedTable from '@/components/table/PaginatedTable'
import { HeadCell } from '@/components/table/table'
import { formatDate, formatDateTime } from '@/lib/formatDate'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
	props,
	ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

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
	const [finish, setFinish] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [changeHappened, setChangedHappened] = React.useState<boolean>(false);

	const router = useRouter()

	const handleSearch = (value: string) => {
		setPage(1)
		setSearchValue(value);
		setChangedHappened(true);
	}

	const handleStateDetails = (e: any) => {
		setPage(1)
		setStateDetails(e.target.value);
		setChangedHappened(true);
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

	const handleInView = async (inView: any) => {
		if (inView && !finish) {
			const newPage = Number(page) + 1;
			setPage(newPage);
		} else {
			if (finish) {
			} else {
				setLoading(true);
			}
		}
	};

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
	}, [stateDetails, searchValue, page, pageSize]);

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
			</Box>
		</Box>
	)
}

export default RideManagement