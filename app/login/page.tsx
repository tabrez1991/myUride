"use client"


import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import { ERROR, SUCCESS } from '@/lib/constants';
import { setCookie } from 'cookies-next';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Box, Button, Card, CircularProgress, Container, FormControl, FormHelperText, IconButton, InputAdornment, Link, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { login } from '@/utils';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);


const Login = () => {
  const [event, setEvent] = React.useState<any>();
  const [submitLoader, setSubmitLoader] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter()

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: (event && event.username) || '',
      password: (event && event.password) || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().email('Should be email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),


    onSubmit: async (values) => {
      setSubmitLoader(true);
      const result = await login(values.username, values.password);
      const { data, error } = result;
      if (data) {
        setCookie('accessToken', data.jwttoken, { maxAge: 24 * 60 * 60 * 1000 });
        setCookie('refreshToken', data.refreshToken);
        setCookie('email', data.email, { maxAge: 24 * 60 * 60 * 1000 });
        setCookie('userid', data._id, { maxAge: 24 * 60 * 60 * 1000 });
        setCookie('name', data.name, { maxAge: 24 * 60 * 60 * 1000 });
        handleAlert(data._id, "Login Successfull", SUCCESS);
        setSubmitLoader(false);
        router.push('/admin')
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
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

  return (
    <Box sx={{ background: "#264ECA", color: "#fff", height: "100vh" }}>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", pt: 20 }}>
          <Typography sx={{ fontSize: "1.25rem" }}>Admin Login</Typography>
        </Box>
        <Card sx={{ mt: 5, width: "500px", margin: "auto", p: 6 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Box>
              <Typography sx={{ textAlign: "center", }}>Please fill in your unique admin login details below</Typography>
              <FormControl
                fullWidth
                error={!!(validation.touched.username && validation.errors.username)}
              >
                <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                  Email address
                </Typography>
                <TextField
                  variant="outlined"
                  name='username'
                  fullWidth
                  size='small'
                  value={validation.values.username || ''}
                  onChange={validation.handleChange}
                />
                {validation.touched.username && validation.errors.username ? (
                  <FormHelperText>{validation.errors.username.toString()}</FormHelperText>
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
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Link href="/registration" sx={{ textDecoration: "none", color: "#666666" }}>Create account</Link>
                <Link href="/forget-password" sx={{ textDecoration: "none", color: "#666666" }}>forgot password?</Link>
              </Box>
              <Button
                variant="contained"
                sx={{ textTransform: 'none', mt: 2 }}
                disabled={submitLoader}
                fullWidth
                onClick={() => validation.submitForm()}
              >
                Login
                {submitLoader && <CircularProgress size={20} sx={{ ml: 1 }} />}
              </Button>
            </Box>
          </form>
        </Card>
      </Container >
    </Box >
  )
}

export default Login
