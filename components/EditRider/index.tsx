import { editDriver, editRider, editUser, getUsersById } from '@/utils';
import { Avatar, Box, Button, CircularProgress, Drawer, FormControl, FormHelperText, Grid, IconButton, InputAdornment, MenuItem, Select, Snackbar, TextField, Typography, styled } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ERROR, SUCCESS, AppRole } from '@/lib/constants';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const EditRider = (props: any) => {
  const { handleClose, isEdit, data, handleSuccess } = props;

  const [loader, setLoader] = React.useState<boolean>(false);
  const [editData, setEditData] = React.useState<any>();
  const [event, setEvent] = React.useState<any>();
  const [submitLoader, setSubmitLoader] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const [isProfilePic, setIsProfilePic] = React.useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = React.useState<any>(null);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (event && event.name) || '',
      // middleName: (event && event.middleName) || '',
      // lastName: (event && event.lastName) || '',
      email: (event && event.email) || '',
      password: (event && event.password) || '',
      confirmPassword: (event && event.confirmPassword) || '',
      mobile: (event && event.mobile) || '',
      roles: (event && event.roles) || '',
      profile_picture: (event && event.profile_picture) || '',
    },
    validationSchema: Yup.object({

    }),


    onSubmit: async (values) => {
      setSubmitLoader(true);
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        // formData.append('middleName', values.middleName);
        // formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('password', values.password === '******' ? '' : values.password);
        formData.append('mobile', values.mobile);
        formData.append('roles', values.roles);
        formData.append('profile_picture', isProfilePic ? values.profile_picture.files[0] : '');

        const result = await editRider(formData);
        const { data, error } = result;
        if (data) {
          handleAlert(data.userId, "Update Successfull", SUCCESS);
          setSubmitLoader(false);
          handleSuccess();
          handleClose()
        } else {
          handleAlert(error.statusCode, error.message, ERROR);
          setSubmitLoader(false);
        }
      } catch (error) {
        console.log(error);
        setSubmitLoader(false);
      }
    },
  });

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleProfilePic = (event: any) => {
    const file = event.target.files[0];
    setIsProfilePic(true);
    validation.setFieldValue('profile_picture', event.target)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  React.useEffect(() => {
    setEditData(data);
    setEvent({
      name: data.rider,
      // middleName: data.middleName,
      // lastName: data.lastName,
      email: data.email,
      password: '******',
      mobile: data.mobileNumber,
      roles: '2',
      profile_picture: `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${data.avatar}`
    })
    setPreviewUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${data.avatar}`);
  }, [data])

  return (
    <Drawer
      anchor='right'
      open={isEdit}
      onClose={handleClose}
    >
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Box sx={{ width: 400, p: 2 }}>
        <Typography>Edit Driver</Typography>

        <Box sx={{ textAlign: "center", margin: "auto" }}>
          <Avatar alt="John" src={previewUrl} id="avatar" sx={{ width: 100, height: 100, margin: "auto", mb: 1, }} />
          <Button component="label" variant="contained" >
            Upload
            <VisuallyHiddenInput type="file" name='profile_picture' onChange={handleProfilePic} />
          </Button>
        </Box>

        <FormControl
          fullWidth
          error={!!(validation.touched.name && validation.errors.name)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Name
          </Typography>
          <TextField
            variant="outlined"
            name='name'
            fullWidth
            size='small'
            value={validation.values.name || ''}
            onChange={validation.handleChange}
          />
          {validation.touched.name && validation.errors.name ? (
            <FormHelperText>{validation.errors.name.toString()}</FormHelperText>
          ) : null}
        </FormControl>

        {/* <FormControl
          fullWidth
          error={!!(validation.touched.middleName && validation.errors.middleName)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Middle Name
          </Typography>
          <TextField
            variant="outlined"
            name='middleName'
            fullWidth
            size='small'
            value={validation.values.middleName || ''}
            onChange={validation.handleChange}
          />
          {validation.touched.middleName && validation.errors.middleName ? (
            <FormHelperText>{validation.errors.middleName.toString()}</FormHelperText>
          ) : null}
        </FormControl> */}

        {/* <FormControl
          fullWidth
          error={!!(validation.touched.lastName && validation.errors.lastName)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Last Name
          </Typography>
          <TextField
            variant="outlined"
            name='lastName'
            fullWidth
            size='small'
            value={validation.values.lastName || ''}
            onChange={validation.handleChange}
          />
          {validation.touched.lastName && validation.errors.lastName ? (
            <FormHelperText>{validation.errors.lastName.toString()}</FormHelperText>
          ) : null}
        </FormControl> */}


        <FormControl
          fullWidth
          error={!!(validation.touched.email && validation.errors.email)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Email
          </Typography>
          <TextField
            variant="outlined"
            name='email'
            fullWidth
            size='small'
            value={validation.values.email || ''}
            onChange={validation.handleChange}
          />
          {validation.touched.email && validation.errors.email ? (
            <FormHelperText>{validation.errors.email.toString()}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          fullWidth
          error={!!(validation.touched.password && validation.errors.password)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Password
          </Typography>
          <TextField
            variant="outlined"
            name='password'
            fullWidth
            size='small'
            type={showPassword ? 'text' : 'password'}
            value={validation.values.password || ''}
            onChange={validation.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {validation.touched.password && validation.errors.password ? (
            <FormHelperText>{validation.errors.password.toString()}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          fullWidth
          error={!!(validation.touched.mobile && validation.errors.mobile)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Mobile
          </Typography>
          <TextField
            variant="outlined"
            name='mobile'
            fullWidth
            size='small'
            value={validation.values.mobile || ''}
            onChange={validation.handleChange}
          />
          {validation.touched.mobile && validation.errors.mobile ? (
            <FormHelperText>{validation.errors.mobile.toString()}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          fullWidth
          error={!!(validation.touched.roles && validation.errors.roles)}
        >
          <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
            Role
          </Typography>
          <Select
            id="demo-simple-select"
            name="roles"
            value={validation.values.roles || ''}
            onChange={validation.handleChange}
          >
            {AppRole.map(item => <MenuItem key={item.id} value={item.value}>{item.id}</MenuItem>)}
          </Select>
          {validation.touched.roles && validation.errors.roles ? (
            <FormHelperText>{validation.errors.roles.toString()}</FormHelperText>
          ) : null}
        </FormControl>
        <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
          <Button
            variant="contained"
            sx={{ textTransform: 'none', mt: 2 }}
            disabled={submitLoader}
            onClick={() => validation.submitForm()}
          >
            Submit
            {submitLoader && <CircularProgress size={20} sx={{ ml: 1 }} />}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default EditRider