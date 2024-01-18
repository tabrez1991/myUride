"use client"

import { Box, CircularProgress } from '@mui/material';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
  const router = useRouter();

  React.useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      router.push('/admin')
    } else {
      router.push('/login')
    }
  }, [])
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height:"100vh" }}>
      <CircularProgress />
    </Box>
  )
}

export default Home