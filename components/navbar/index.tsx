"use client";

import { Box, Card, Collapse, Drawer, List, ListItem, ListItemButton, ListItemText, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

interface NavProps {
}

const NavBar = (props: NavProps) => {
  const [active, setActive] = React.useState<string>('dashboard');
  const [open, setOpen] = React.useState(false);

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

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleRoute = (menu: string) => {
    setActive(menu);
    switch (menu) {
      case "dashboard":
        router.push('/admin');
        break;
      case "user":
        router.push('/admin/user-management');
        break;
      case "driver":
        router.push('/admin/driver-management');
        break;
      case "rider":
        router.push('/admin/rider-management');
        break;
      case "trip":
        router.push('/admin/trip-management');
        break;
      case "payments-rider":
        router.push('/admin/payments-rider');
        break;
      case "payments-driver":
        router.push('/admin/payments-driver');
        break;
      case "notifications":
        router.push('/admin/notifications');
        break;
      case "settings":
        router.push('/admin/settings');
        break;
      case "marketing":
        router.push('/admin/promotion-marketing');
        break;
      case "support":
        router.push('/admin/support');
        break;
      case "feedback":
        router.push('/admin/feedback');
        break;
      default:
        router.push('/admin');
        break;
    }
  }

  React.useEffect(() => {
    console.log(window.location.pathname.split('-')[0].replace('/admin/', ''))
    if (window.location.pathname.split('-')[0].replace('/admin/', '') === '/admin') {
      setActive('dashboard')
    } else {
      setActive(window.location.pathname.split('-')[0].replace('/admin/', ''))
    }
  }, [])

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
                <Typography sx={active === 'user' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Admin Users Management</Typography>
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
          <ListItemButton onClick={() => handleRoute('rider')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'rider' ? activeIcon : inactiveIcon}><i className="ri-user-settings-line"></i></Typography>
                <Typography sx={active === 'rider' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Rider Management</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}> <i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoute('trip')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'trip' ? activeIcon : inactiveIcon}><i className="ri-phone-lock-line"></i></Typography>
                <Typography sx={active === 'trip' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Trip Management</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}> <i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleToggle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'payments' ? activeIcon : inactiveIcon}><i className="ri-bank-card-line"></i></Typography>
                <Typography sx={active === 'payments' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Payments</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}>{open ? <i className="ri-arrow-down-s-line"></i> : <i className="ri-arrow-right-s-line"></i>}</Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit sx={{}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MenuItem onClick={() => handleRoute('payments-rider')}>
              <Typography>Rider</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleRoute('payments-driver')}>
              <Typography>Driver</Typography>
            </MenuItem>
          </Box>
        </Collapse>
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
        {/* <ListItem>
          <ListItemButton onClick={() => handleRoute('marketing')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'marketing' ? activeIcon : inactiveIcon}><i className="ri-megaphone-line"></i></Typography>
                <Typography sx={active === 'marketing' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Promotions & Marketing</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem>
          <ListItemButton onClick={() => handleRoute('support')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography sx={active === 'support' ? activeIcon : inactiveIcon}><i className="ri-customer-service-2-line"></i></Typography>
                <Typography sx={active === 'support' ? { fontSize: '0.875rem', fontWeight: 400 } : { fontSize: '0.875rem', color: '#989393' }}>Customer Support</Typography>
              </Box>
              <Typography sx={{ color: '#21328d', fontSize: '1.5rem', }}><i className="ri-arrow-right-s-line"></i></Typography>
            </Box>
          </ListItemButton>
        </ListItem> */}
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