"use client";

import { Box, Card, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

interface NavProps {
}

const NavBar = (props: NavProps) => {
  const [active, setActive] = React.useState<string>('dashboard');

  const router = useRouter();

  const activeIcon = {
    color: '#fff',
    background: '#21328d',
    fontSize: '1.5rem',
    lineHeight: 1,
    padding: '2px',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginRight: '10px'
  }

  const inactiveIcon = {
    color: '#21328d',
    fontSize: '1.5rem',
    lineHeight: 1,
    padding: '2px',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginRight: '10px'
  }

  const handleRoute = (menu: string) => {
    setActive(menu);
    switch (menu) {
      case "dashboard":
        router.push('/');
        break;
      case "user":
        router.push('/user-management');
        break;
      case "driver":
        router.push('/driver-management');
        break;
      case "ride":
        router.push('/ride-management');
        break;
      case "payments":
        router.push('/payments');
        break;
      case "notifications":
        router.push('/notifications');
        break;
      case "settings":
        router.push('/settings');
        break;
      case "marketing":
        router.push('/promotion-marketing');
        break;
      case "support":
        router.push('/support');
        break;
      case "feedback":
        router.push('/feedback');
        break;
      default:
        router.push('/');
        break;
    }
  }
  return (
    <Card sx={{ marginTop: '64px', width: '270px', height: '100vh', boxShadow: "none", overflowY: "scroll" }}>
      <List>
        <ListItem>
          <ListItemButton>
            <Typography sx={{ color: '#989393' }}>MENU</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute("dashboard")}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'dashboard' ? activeIcon : inactiveIcon}><i className="ri-dashboard-fill"></i></Typography>
                <Typography sx={active === 'dashboard' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Dashboard</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('user')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'user' ? activeIcon : inactiveIcon}><i className="ri-user-add-line"></i></Typography>
                <Typography sx={active === 'user' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>User Management</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}> <i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('driver')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'driver' ? activeIcon : inactiveIcon}><i className="ri-user-settings-line"></i></Typography>
                <Typography sx={active === 'driver' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Driver Management</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}> <i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('ride')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'ride' ? activeIcon : inactiveIcon}><i className="ri-phone-lock-line"></i></Typography>
                <Typography sx={active === 'ride' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Ride Management</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}> <i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('payments')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'payments' ? activeIcon : inactiveIcon}><i className="ri-bank-card-line"></i></Typography>
                <Typography sx={active === 'payments' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Payments</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('notifications')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'notifications' ? activeIcon : inactiveIcon}><i className="ri-notification-4-line"></i></Typography>
                <Typography sx={active === 'notifications' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Notifications</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('settings')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'settings' ? activeIcon : inactiveIcon}><i className="ri-settings-2-line"></i></Typography>
                <Typography sx={active === 'settings' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Settings</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('marketing')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'marketing' ? activeIcon : inactiveIcon}><i className="ri-megaphone-line"></i></Typography>
                <Typography sx={active === 'marketing' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Promotions & Marketing</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('support')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'support' ? activeIcon : inactiveIcon}><i className="ri-customer-service-2-line"></i></Typography>
                <Typography sx={active === 'support' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Customer Support</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('feedback')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'feedback' ? activeIcon : inactiveIcon}><i className="ri-feedback-line"></i></Typography>
                <Typography sx={active === 'feedback' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Feedback</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}> <i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  )
}

export default NavBar