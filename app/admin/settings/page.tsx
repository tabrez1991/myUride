"use client"

import { Box, Tabs, Tab } from '@mui/material'
import React from 'react'
import SettingsDetails from '@/components/SettingsDetails';
import Faqs from '@/components/Faqs';


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Settings = () => {
  const [value, setValue] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: "100vh", overflowY: "scroll" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Settings" {...a11yProps(0)} />
          <Tab label="Faqs" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* {value === 0 && <SettingsDetails />} */}
      {value === 1 && <Faqs />}

    </Box>
  )
}

export default Settings