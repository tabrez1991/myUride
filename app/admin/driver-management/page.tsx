"use client"

import ActionsMenu from '@/components/ActionMenu'
import SearchBox from '@/components/SearchBox'
import { activateDriver, deleteDriver, getDrivers, logout } from '@/utils'
import { Avatar, Box, Button, CardMedia, Chip, Collapse, Divider, Grid, IconButton, Modal, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ERROR, SUCCESS } from '@/lib/constants'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import EditDriver from '@/components/EditDriver'
import AddDriver from '@/components/AddDriver'

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
	const [page, setPage] = React.useState<number>(1);
	const [pageSize, setPageSize] = React.useState<number>(10)
	const [pageTotal, setPageTotal] = React.useState<number>(100)
	const [rows, setRows] = React.useState<any[]>([])
	const [loader, setLoader] = React.useState<boolean>(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertType, setAlertType] = React.useState<AlertColor>('success')
	const [alertMsg, setAlertMsg] = React.useState('')
	const [render, setRender] = React.useState<boolean>(false);
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	const [editData, setEditData] = React.useState<any>();
	const [isAdd, setIsAdd] = React.useState<boolean>(false);
	const [selectedId, setSelectedId] = React.useState<string>('')
	const [deletedDetails, setDeletedDetails] = React.useState<any>()
	const [isDelete, setIsDelete] = React.useState<boolean>(false);
	const [metaData, setMetaData] = React.useState<any>({})

	const router = useRouter()


	const handleAddDriver = () => {
		setIsAdd(true);
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
				data?.data.forEach((element: any, index: number) => {
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
						status: element?.user?.status,
						car_model: element?.car_model,
						make: element?.make,
						model: element?.model,
						year: element?.year,
						license_number: element?.backgroundCheck?.license_number,
						license_state: element?.backgroundCheck?.license_state,
						vehicle_license_plate_number: element?.vehicle_license_plate_number,
						upload_vehicle_registration: element?.upload_vehicle_registration,
						upload_driver_licence: element?.upload_driver_licence,
						upload_inssurance_card: element?.upload_inssurance_card
					})
				});
				setPageTotal(data?.metadata?.total)
				setMetaData(data?.metadata)
				setRows(tempRow)
				setLoader(false);
			} else {
				handleAlert(error.statusCode, error.message, ERROR);
			}
		} catch (error) {
			console.error(error);
			setLoader(false);
		}
	}

	React.useEffect(() => {
		getDriversDetails()
	}, [page, pageSize, searchValue, render]);

	function Row(props: { row: ReturnType<any> }) {
		const { row } = props;
		const [open, setOpen] = React.useState(false);

		return (
			<React.Fragment>
				<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
					<TableCell size='small'>{row.driverId}</TableCell>
					<TableCell size='small'>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Avatar alt={row.driver} src={row.avatar} id="avatar" sx={{ mr: 2 }} />
							{row.driver}
						</div>
					</TableCell>
					<TableCell size='small'>
						{row.middleName}
					</TableCell>
					<TableCell size='small'>
						{row.lastName}
					</TableCell>
					<TableCell size='small'>
						{row.mobileNumber}
					</TableCell>
					<TableCell size='small'>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							{Array.from({ length: row.ratings }, (_, index) => (
								<Typography key={index} sx={{ color: '#ffd700', fontSize: '20px' }}>
									<i className="ri-star-fill" />
								</Typography>
							))}
						</div>
					</TableCell>
					<TableCell size='small'>
						{row.totalTrips}
					</TableCell>
					<TableCell size='small'>
						{row.totalEarnings}
					</TableCell>
					<TableCell size='small'>
						<Chip label={row.status ? "ACTIVE" : "INACTIVE"} color={row.status === 1 ? 'success' : 'primary'} />
					</TableCell>
					<TableCell size='small'>
						<ActionsMenu id={row} options={row.status === 1 ? options : options2} close={!isEdit && !isDelete} />
					</TableCell>
					<TableCell size='small'>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
						>
							{open ? <Typography><i className="ri-arrow-up-s-line"></i></Typography> : <Typography><i className="ri-arrow-down-s-line"></i></Typography>}
						</IconButton>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell size='small' style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									Car Details
								</Typography>
								<Divider />
								<Grid container>
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
										<Typography sx={{ fontWeight: 700 }}>Car Model :</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>{row?.car_model}</Grid>
									<Divider orientation="vertical" flexItem />
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
										<Typography sx={{ fontWeight: 700, pl: 1 }}>Maker :</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>{row?.make}</Grid>
								</Grid>
								<Divider />
								<Grid container>
									<Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
										<Typography sx={{ fontWeight: 700 }}>Model : </Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={2} xl={2}>{row?.model}</Grid>
									<Divider orientation="vertical" flexItem />
									<Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
										<Typography sx={{ fontWeight: 700, pl: 1  }}>Year: </Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={2} xl={2}>{row?.year}</Grid>
									<Divider orientation="vertical" flexItem />
									<Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
										<Typography sx={{ fontWeight: 700, pl: 1  }}>Vehicle License Plate Number :</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={2} xl={2}>{row?.vehicle_license_plate_number}</Grid>
								</Grid>
								<Divider />
								<Grid container>
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
										<Typography sx={{ fontWeight: 700 }}>License Number :</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>{row?.backgroundCheck?.license_number}</Grid>
									<Divider orientation="vertical" flexItem />
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
										<Typography sx={{ fontWeight: 700, pl: 1 }}>License State :</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>{row?.backgroundCheck?.license_number}</Grid>
								</Grid>
								<Divider />
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
										<Typography sx={{ fontWeight: 700 }}>Vehicle Registration</Typography>
										<CardMedia
											sx={{ height: 140, mb: 1 }}
											image={row?.upload_vehicle_registration}
											title='previewUrlVehicleRegistration'
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
										<Typography sx={{ fontWeight: 700 }}>Driver Licence</Typography>
										<CardMedia
											sx={{ height: 140, mb: 1 }}
											image={row?.upload_driver_licence}
											title='upload_inssurance_card'
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
										<Typography sx={{ fontWeight: 700 }}>Inssurance Card</Typography>
										<CardMedia
											sx={{ height: 140, mb: 1 }}
											image={row?.upload_inssurance_card}
											title='upload_inssurance_card'
										/>
									</Grid>
								</Grid>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment >
		);
	}

	return (
		<Box sx={{ height: "100vh", overflowY: "scroll" }}>
			<Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
					{alertMsg}
				</Alert>
			</Snackbar>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant='h5'>Driver Management</Typography>
				<Button variant='contained' sx={{ textTransform: "none" }} onClick={handleAddDriver}>Add Driver</Button>
			</Box>
			<Box sx={{ mt: 2 }}>
				<SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
			</Box>
			<Box sx={{ mt: 2, width: "100%" }}>
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell size='small'>Driver Id</TableCell>
								<TableCell size='small'>Firstname</TableCell>
								<TableCell size='small'>Middle Name</TableCell>
								<TableCell size='small'>Last Name</TableCell>
								<TableCell size='small'>Mobile Number</TableCell>
								<TableCell size='small'>Ratings</TableCell>
								<TableCell size='small'>Total Trips</TableCell>
								<TableCell size='small'>Total Earnings</TableCell>
								<TableCell size='small'>Status</TableCell>
								<TableCell size='small'>Action</TableCell>
								<TableCell size='small' />
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<Row key={row.name} row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component="div"
					count={pageTotal}
					page={page - 1}
					onPageChange={handleChangePage}
					rowsPerPage={pageSize}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box>
			{isEdit && <EditDriver isEdit={isEdit} handleClose={() => setIsEdit(false)} data={editData} handleSuccess={() => setRender(!render)} />}
			{isAdd && <AddDriver isAdd={isAdd} handleClose={() => setIsAdd(false)} handleSuccess={() => setRender(!render)} />}
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