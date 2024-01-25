"use client"

import { Box, Container, Grid, Skeleton, Snackbar } from '@mui/material'
import CustomCard from '@/components/CustomCard'
import LineGraph from '@/components/LineGraph'
import PieChart from '@/components/PieChart'
import React from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { getMonthWise, getMonthWiseGrowth, getTotalData } from '@/utils'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ERROR } from '@/lib/constants'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);


export default function Home() {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [totalDetails, setTotalDetails] = React.useState<any>();
  const [monthWise, setMonthWise] = React.useState<any[]>([]);
  const [usersGrowth, setUsersGrowth] = React.useState<any[]>([]);
  const [driverGrowth, setDriverGrowth] = React.useState<any[]>([]);
  const [riderGrowth, setRiderGrowth] = React.useState<any[]>([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('')

  const router = useRouter();

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

  const getTotalDetails = async () => {
    setLoader(true)
    const result = await getTotalData();
    const { data, error } = result;
    if (data) {
      setTimeout(() => {
        setTotalDetails(data);
        setLoader(false);
      }, 2000);
    } else {
      handleAlert(error.statusCode, error.message, ERROR);
      setLoader(false)
    }
  }

  const getMonthlyWise = async () => {
    setLoader(true)
    const result = await getMonthWise();
    const { data, error } = result;
    if (data) {
      setTimeout(() => {
        const tempData: any[] = [];
        data?.forEach((element: any) => {
          tempData.push({
            x: element.month,
            y: element.count
          })
        });
        console.log(tempData, "tempData")
        setMonthWise([{
          id: 'growth',
          data: tempData
        }])
        setLoader(false);
      }, 2000);
    } else {
      handleAlert(error.statusCode, error.message, ERROR);
      setLoader(false)
    }
  }

  const getMonthlyWiseGrowth = async () => {
    setLoader(true)
    const result = await getMonthWiseGrowth();
    const { data, error } = result;
    console.log("growth", data);
    if (data) {
      setTimeout(() => {
        setUsersGrowth([
          {
            id: "totalUser",
            label: "Users",
            value: data.user.total,
            color: "hsl(231, 62%, 34%, 1)"
          },
          {
            id: "currentMonth",
            label: "Users",
            value: data.user.current,
            color: "hsl(34, 70%, 50%)"
          },
        ])
        setDriverGrowth([
          {
            id: "totalDrivers",
            label: "Drivers",
            value: data.drivers.total,
            color: "hsl(231, 62%, 34%, 1)"
          },
          {
            id: "currentMonth",
            label: "Drivers",
            value: data.drivers.current,
            color: "hsl(34, 70%, 50%)"
          },
        ])
        setRiderGrowth([
          {
            id: "totalRiders",
            label: "Riders",
            value: data.riders.total,
            color: "hsl(231, 62%, 34%, 1)"
          },
          {
            id: "currentMonth",
            label: "Riders",
            value: data.riders.current,
            color: "hsl(34, 70%, 50%)"
          },
        ])
      }, 2000);
    } else {
      handleAlert(error.statusCode, error.message, ERROR);
      setLoader(false)
    }
  }

  React.useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      router.push('/admin');
      getTotalDetails();
      getMonthlyWise();
      getMonthlyWiseGrowth();
    } else {
      router.push('/login');
    }
  }, [])

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          {loader ? <Box>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
          </Box> : <CustomCard icon={<i className="ri-car-fill"></i>} label='Total Rides' value={totalDetails?.totalTrips} />}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          {loader ? <Box>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
          </Box> : <CustomCard icon={<i className="ri-user-3-fill"></i>} label='Total App Users' value={totalDetails?.totalUser} />}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          {loader ? <Box>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
          </Box> : <CustomCard icon={<i className="ri-user-location-fill"></i>} label='Total Drivers' value={totalDetails?.totalDrivers} />}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          {loader ? <Box>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
          </Box> : <CustomCard icon={<i className="ri-taxi-wifi-fill"></i>} label='Total Riders' value={totalDetails?.totalRiders} />}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
          {loader ? <Box>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"100%"} height={400} sx={{ mt: 1 }} />
          </Box> : <LineGraph data={monthWise} />}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          {loader ? <Box>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
            <Skeleton variant="circular" width={40} height={40} sx={{ mt: 1 }} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
            <Skeleton variant="circular" width={40} height={40} sx={{ mt: 1 }} />
            <Skeleton variant="rounded" width={"100%"} height={130} sx={{ mt: 1 }} />
          </Box> : <Box>
            <PieChart data={usersGrowth} />
            <PieChart data={driverGrowth} />
            <PieChart data={riderGrowth} />
          </Box>}
          {/* <PieChart />
          <PieChart /> */}
        </Grid>
      </Grid>
    </Box>
  )
}
