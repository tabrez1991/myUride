import Image from 'next/image'
import styles from './page.module.css'
import { Box, Container, Grid } from '@mui/material'
import CustomCard from '@/components/CustomCard'
import LineGraph from '@/components/LineGraph'
import PieChart from '@/components/PieChart'

export default function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <CustomCard icon={<i className="ri-car-fill"></i>} label='Total Rides' value={112} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <CustomCard icon={<i className="ri-user-3-fill"></i>} label='Total Users' value={145234} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <CustomCard icon={<i className="ri-user-location-fill"></i>} label='Total Drivers' value={1241} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <CustomCard icon={<i className="ri-taxi-wifi-fill"></i>} label='Total Riders' value={16512} />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
          <LineGraph />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <PieChart />
          <PieChart />
          <PieChart />
        </Grid>
      </Grid>
    </Box>
  )
}
