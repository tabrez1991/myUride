"use client"

import { Box, Button, Stack, styled } from '@mui/material'
import React from 'react'
import styles from './style.module.scss';
import SettingsDetails from '@/components/SettingsDetails';
import Faqs from '@/components/Faqs';


const StyledButton = styled(Button)`
  &:hover {
    background: #1976d2;
    color: #fff;
  }
`;

const Settings = () => {
  const tabs = ['Settings', 'Faqs'];
  const [tab, setTab] = React.useState(tabs[0]);
  return (
    <Box sx={{ height: "100vh", overflowY: "scroll" }}>
      <Box sx={{ marginBottom: '2.0625rem' }}>
        <Stack direction="row" spacing="0.67rem" sx={{ marginBottom: 0 }}>
          {tabs.map((tabtitle) => (
            <StyledButton
              className={styles.tabB}
              style={{
                textTransform: 'none',
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottom: 0,
              }}
              key={tabtitle}
              size="small"
              onClick={() => setTab(tabtitle)}
              variant={tabtitle === tab ? 'contained' : 'outlined'}
              color={tabtitle === tab ? 'primary' : 'primary'} //
            >
              {tabtitle}
            </StyledButton>
          ))}
        </Stack>
        <hr className={styles.line} />
      </Box>
      {tab === tabs[0] && <SettingsDetails />}
      {tab === tabs[1] && <Faqs />}

    </Box>
  )
}

export default Settings