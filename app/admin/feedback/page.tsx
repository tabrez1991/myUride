"use client"

import SearchBox from '@/components/SearchBox'
import { getFeedback, getStates, getTrips, logout } from '@/utils'
import { Box, Chip, CircularProgress, MenuItem, Paper, Rating, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ERROR } from '@/lib/constants'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { formatDateTime } from '@/lib/formatDate'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

const Feedback = () => {
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

  const router = useRouter()

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


  const calculateStartingSerialNumber = () => {
    return (page - 1) * pageSize + 1;
  };

  const getFeedbackDetails = async () => {
    setLoader(true)
    setTripData([])
    try {
      const tempRow: any = [];
      const result = await getFeedback(page, pageSize, searchValue.trim());
      const { data, error } = result;
      if (data) {
        if (data.data.length > 0) {
          data.data.forEach((element: any, i: number) => {
            tempRow.push({
              id: calculateStartingSerialNumber() + i,
              feedbackId: element?._id,
              name: element?.fullname,
              mobile: element?.mobile,
              description: element?.description,
              rating: element?.rating,
              created_date: element?.created_date,
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
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  }


  React.useEffect(() => {
    getFeedbackDetails()
  }, [searchValue, page, pageSize]);

  return (
    <Box sx={{ height: "100vh", overflowY: "scroll" }}>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Typography variant='h5'>Feedback</Typography>
      <Box sx={{ mt: 2 }}>
        <SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
      </Box>
      <Box sx={{ mt: 2 }}>
        {loader ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box> : <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S No</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
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
                      {row.feedbackId}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell><Rating name="read-only" value={row.rating} readOnly /> </TableCell>
                    <TableCell>{formatDateTime(row.created_date)}</TableCell>
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
        </>}
      </Box>
    </Box>
  )
}

export default Feedback