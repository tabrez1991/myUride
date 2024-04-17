"use client"; // This is a client component

import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Snackbar, Toolbar, Tooltip, Typography, alpha, styled } from '@mui/material'
import Image from 'next/image'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React from 'react'
import logo from '../../assets/images/myUride.png'
import { getUsersById, logout } from '@/utils';
import { deleteCookie, getCookie } from 'cookies-next';
import { ERROR, SUCCESS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import Profile from '../Profile';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    float: "right",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
      background: "#eee",
      borderRadius: "10px",
    },
    [theme.breakpoints.between('xs', 'md')]: {
      width: '20ch',
      background: "#eee",
      borderRadius: "10px",
    },
  },
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

const Header = (props: any) => {
  const { handleNavBar } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('')
  const [isProfile, setIsProfile] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [profileData, setProfileData] = React.useState<any>();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const router = useRouter()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

  const handleProfile = () => {
    setIsProfile(true);
  }

  const handleLogout = async () => {
    const result = await logout();
    const { data, error } = result;
    if (data) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('email');
      handleAlert(data.userId, "Logout Successfully", SUCCESS);
      router.push('/login')
    } else {
      handleAlert(error.statusCode, error.message, ERROR);
    }
  }

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ top: "48px" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "#21328d"
            }
          }}>
            <i className="ri-notification-4-line"></i>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt={profileData?.name} src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profileData?.profile_picture}`} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const getUserDetailsById = async (id: string) => {
    setLoader(true)
    const result = await getUsersById(id);
    const { data, error } = result;
    if (data) {
      setProfileData(data);
      setLoader(false);
    } else {
      handleAlert(error.statusCode, error.message, ERROR);
      setLoader(false)
    }
  }

  React.useEffect(() => {
    const userid = getCookie('userid') || '';
    getUserDetailsById(userid)
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <AppBar position="absolute" sx={{ background: "#fff", color: "#000", left: 0 }}>
        <Toolbar>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, }}>
            <Image
              src={logo}
              width={150}
              height={60}
              alt="Picture of the author"
            />
          </Box>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'none', lg: 'flex' },
              fontWeight: 400,
              fontSize: "1.5rem",
              // letterSpacing: '.3rem',
              color: '#262525',
              textDecoration: 'none',
              marginLeft: '125px'
            }}
          >
            Welcome Back, {profileData?.name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNavBar}
              color="inherit"
            >
              <i className="ri-menu-line"></i>
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, }}>
              <Image
                src={logo}
                width={150}
                height={60}
                alt="Picture of the author"
              />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <i className="ri-search-2-line"></i>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0, width: "270px", display: { xs: 'none', md: 'flex' }, justifyContent: "space-between", alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt={profileData?.name} src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profileData?.profile_picture}`} />
                <Typography sx={{ color: "#000", fontWeight: 400, ml: "0.875rem", display: { xs: 'none', sm: 'block' } }}>{profileData?.name}</Typography>
                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: "5px" }}>
                  <i className="ri-arrow-down-s-line"></i>
                </IconButton>
              </Box>
            </Tooltip>

            <Box>
              <IconButton onClick={() => alert('notification')} sx={{ p: 0, ml: "5px" }}>
                <Badge badgeContent={1} sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "#21328d"
                  }
                }}>
                  <i className="ri-notification-4-line"></i>
                </Badge>
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <i className="ri-more-2-fill"></i>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {isProfile && profileData && <Profile handleClose={() => setIsProfile(false)} isEdit={isProfile} data={profileData}/>}
    </Box>
  )
}

export default Header