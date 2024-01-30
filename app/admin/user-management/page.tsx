"use client"

import ActionsMenu from '@/components/ActionMenu'
import DataTable from '@/components/DataTable'
import EditDetails from '@/components/EditDetails'
import SearchBox from '@/components/SearchBox'
import { ERROR, SUCCESS } from '@/lib/constants'
import { formatDateTime } from '@/lib/formatDate'
import { activateUser, deleteUser, getUsers, logout } from '@/utils'
import { Avatar, Box, Button, Chip, Modal, Snackbar, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import AddDetails from '@/components/AddDetails'

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


const UserManagement = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [rows, setRows] = React.useState<any[]>([])
  const [loader, setLoader] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<string>('')
  const [deletedDetails, setDeletedDetails] = React.useState<any>()
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isAdd, setIsAdd] = React.useState<boolean>(false);
  const [render, setRender] = React.useState<boolean>(false);
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('')

  const router = useRouter()

  const handleEditUser = (data: any) => {
    setSelectedId(data.username);
    setIsEdit(true);
  }

  const handleAddUser = () => {
    setIsAdd(true);
  }

  const handleDeleteUser = (data: any) => {
    setDeletedDetails(data);
    setSelectedId(data.username);
    setIsDelete(true);
  }

  const handleActivate = async (activeDetails: any) => {
    setLoader(true)
    try {
      const result = await activateUser(activeDetails?.email);
      const { data, error } = result;
      if (data) {
        setRender(!render)
        setLoader(false);
        handleDenied();
        handleAlert(data.userId, "User Activated Successfully", SUCCESS);
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
      label: "Edit User",
      handler: handleEditUser
    },
    {
      label: "Deactivate User",
      handler: handleDeleteUser
    }
  ]

  const options2 = [
    {
      label: "Edit User",
      handler: handleEditUser
    },
    {
      label: "Activate User",
      handler: handleActivate
    }
  ]

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'username', headerName: 'User id', width: 250 },
    {
      field: 'firstname', headerName: 'Firstname', flex: 1.5,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={params.row.fullName} src={`${process.env.NEXT_PUBLIC_BASE_URL}${params.row.avatar}`} id="avatar" sx={{ mr: 2 }} />
          {params.row.fullName}
        </div>
      ),
    },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'lastName', headerName: 'Lastname', flex: 1 },
    { field: 'mobile', headerName: 'Mobile Number', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip label={params.row.status} color={params.row.status === 'ACTIVE' ? 'success' : 'primary'} />
      ),
    },
    { field: 'dateCreated', headerName: 'Date Created', width: 150 },
    { field: 'lastLogin', headerName: 'Last Login', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <ActionsMenu id={params.row} options={params.row.status === 'ACTIVE' ? options : options2} close={!isEdit && !isDelete && !isAdd} />
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

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

  const handleDenied = () => {
    setDeletedDetails(null);
    setSelectedId('');
    setIsDelete(false);
  }

  const handleAccept = async () => {
    setLoader(true)
    try {
      const result = await deleteUser(deletedDetails.email);
      const { data, error } = result;
      if (data) {
        setRender(!render)
        setLoader(false);
        handleDenied();
        handleAlert(data.userId, "User Deleted Successfully", SUCCESS);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        handleLogout()
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
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


  const getUserDetails = async () => {
    setLoader(true)
    try {
      const tempRow: any = [];
      const result = await getUsers(page, pageSize, searchValue);
      const { data, error } = result;
      if (data) {
        data.forEach((element: any, index: number) => {
          tempRow.push({
            id: index + 1,
            username: element._id,
            avatar: element.profile_picture,
            fullName: element.name,
            middleName: element.middleName,
            lastName: element.lastName,
            email: element.email,
            mobile: element.mobile,
            status: element.status,
            dateCreated: element.creation_date && formatDateTime(element.creation_date),
            lastLogin: element.last_login && formatDateTime(element.last_login),
          })
        });
        setRows(tempRow)
        setLoader(false);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        handleLogout()
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
    }

  }



  React.useEffect(() => {
    getUserDetails()
  }, [page, pageSize, searchValue, render]);

  return (
    <Box sx={{ height: "100vh", overflowY: "scroll" }}>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant='h5'>Admin Users Management</Typography>
        <Button variant='contained' sx={{ textTransform: "none" }} onClick={handleAddUser}>Add Admin User</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
      </Box>
      <Box sx={{ mt: 2 }}></Box>
      <DataTable columns={columns} rows={rows} page={page} pageSize={pageSize} loader={loader} checkboxEnables={false} />
      {isEdit && <EditDetails isEdit={isEdit} handleClose={() => setIsEdit(false)} id={selectedId} handleSuccess={() => setRender(!render)} />}
      {isAdd && <AddDetails isAdd={isAdd} handleClose={() => setIsAdd(false)} handleSuccess={() => setRender(!render)} />}
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
            <Typography sx={{ fontFamily: 'Source Sans Pro', fontWeight: 400, fontSize: '1.25rem', mt: 2 }}>Do you want to deactivate user {deletedDetails?.fullname}</Typography>
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

export default UserManagement