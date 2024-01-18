"use client"


import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import { ERROR, SUCCESS } from '@/lib/constants';
import { setCookie } from 'cookies-next';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Box, Button, Card, CircularProgress, Container, FormControl, FormHelperText, IconButton, InputAdornment, Link, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { login, resetPassword } from '@/utils';


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
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const router = useRouter()

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: (event && event.email) || '',
      password: (event && event.password) || '',
      confirmPassword: (event && event.confirmPassword) || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Should be email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
    }),


    onSubmit: async (values) => {
      setSubmitLoader(true);
      const result = await resetPassword(values.email, values.password);
      const { data, error } = result;
      if (data) {
        setCookie('email', data.userName, { maxAge: 300 });
        handleAlert(data._id, "Password Reset Successfull", SUCCESS);
        setSubmitLoader(false);
        setTimeout(() => {
          router.push('/login')
        }, 1000);
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

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
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
          <Typography sx={{ fontSize: "1.25rem" }}>Forget Password</Typography>
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
              <FormControl
                fullWidth
                error={!!(validation.touched.email && validation.errors.email)}
              >
                <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                  Email address
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
                error={!!(validation.touched.confirmPassword && validation.errors.confirmPassword)}
              >
                <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                  Confirm Password
                </Typography>
                <TextField
                  variant="outlined"
                  name='confirmPassword'
                  fullWidth
                  size='small'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={validation.values.confirmPassword || ''}
                  onChange={validation.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-off-line"></i>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                  <FormHelperText>{validation.errors.confirmPassword.toString()}</FormHelperText>
                ) : null}
              </FormControl>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                <Link href="/login" sx={{ textDecoration: "none", color: "#666666" }}>Already have an account</Link>
              </Box>
              <Button
                variant="contained"
                sx={{ textTransform: 'none', mt: 2 }}
                disabled={submitLoader}
                fullWidth
                onClick={() => validation.submitForm()}
              >
                Reset Password
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
