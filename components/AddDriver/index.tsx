import { addDriver } from '@/utils';
import { Avatar, Box, Button, CardMedia, CircularProgress, Drawer, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, Radio, RadioGroup, Snackbar, TextField, Typography, styled } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ERROR, SUCCESS } from '@/lib/constants';

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


const AddDriver = (props: any) => {
  const { handleClose, isAdd, handleSuccess } = props;

  const [event, setEvent] = React.useState<any>();
  const [submitLoader, setSubmitLoader] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const [isProfilePic, setIsProfilePic] = React.useState<boolean>(false);
  const [isUploadVehicleRegistration, setIsUploadVehicleRegistration] = React.useState<boolean>(false);
  const [isUploadDriverLicence, setIsUploadDriverLicence] = React.useState<boolean>(false);
  const [isUploadInsuranceCard, setIsUploadInsuranceCard] = React.useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = React.useState<any>(null);
  const [previewUrlVehicleRegistration, setPreviewUrlVehicleRegistration] = React.useState<any>('/placeholder-image.webp');
  const [previewUrlDriverLicence, setPreviewUrlDriverLicence] = React.useState<any>('/placeholder-image.webp');
  const [previewUrlInsuranceCard, setPreviewUrlInsuranceCard] = React.useState<any>('/placeholder-image.webp');

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      type: (event && event.type) || '',
      legal_first_name: (event && event.legal_first_name) || '',
      legal_middle_name: (event && event.legal_middle_name) || '',
      legal_last_name: (event && event.legal_last_name) || '',
      email: (event && event.email) || '',
      password: (event && event.password) || '',
      mobile: (event && event.mobile) || '',
      university_name: (event && event.university_name) || '',
      student_id: (event && event.student_id) || '',
      university_address: (event && event.university_address) || '',
      gender: (event && event.gender) || '',
      destination_contact_number: (event && event.destination_contact_number) || '',
      gender_preferences: (event && event.gender_preferences) || '',
      rider_preference: (event && event.rider_preference) || '',
      phone_code: (event && event.phone_code) || '',
      phone_no: (event && event.phone_no) || '',
      profile_picture: (event && event.profile_picture) || '',
      license_number: (event && event.license_number) || '',
      license_state: (event && event.license_state) || '',
      zip_code: (event && event.zip_code) || '',
      dob: (event && event.dob) || '',
      ssn: (event && event.ssn) || '',
      make: (event && event.make) || '',
      model: (event && event.model) || '',
      year: (event && event.year) || '',
      upload_vehicle_registration: (event && event.upload_vehicle_registration) || '',
      upload_driver_licence: (event && event.upload_driver_licence) || '',
      upload_inssurance_card: (event && event.upload_inssurance_card) || '',
      car_model: (event && event.car_model) || '',
      vehicle_license_plate_number: (event && event.vehicle_license_plate_number) || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Should be email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      mobile: Yup.string().required('Mobile is required'),
      legal_first_name: Yup.string().required('Firstname is required'),
      legal_last_name: Yup.string().required('Lastname is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.string().required('Date of Birth is required'),
    }),


    onSubmit: async (values) => {
      setSubmitLoader(true);
      try {
        const formData = new FormData();
        formData.append("type", "1");
        formData.append('profile_picture', isProfilePic ? values.profile_picture.files[0] : '');
        formData.append("legal_first_name", values.legal_first_name);
        formData.append("legal_middle_name", values.legal_middle_name);
        formData.append("legal_last_name", values.legal_last_name);
        formData.append("email", values.email);
        formData.append('password', values.password === '******' ? '' : values.password);
        formData.append("mobile", values.mobile);
        formData.append("gender", values.gender);
        formData.append("dob", values.dob);
        formData.append("ssn", values.ssn);
        formData.append("student_id", values.student_id);
        formData.append("university_name", values.university_name);
        formData.append("university_address", values.university_address);
        formData.append("zip_code", values.zip_code);
        formData.append("destination_contact_number", values.destination_contact_number);
        formData.append("gender_preferences", values.gender_preferences);
        formData.append("rider_preference", values.rider_preference);
        formData.append("phone_code", values.phone_code);
        formData.append("phone_no", values.phone_no);


        formData.append("license_number", values.license_number);
        formData.append("license_state", values.license_state);
        formData.append("car_model", values.car_model);
        formData.append("make", values.make);
        formData.append("model", values.model);
        formData.append("year", values.year);
        formData.append("vehicle_license_plate_number", values.vehicle_license_plate_number);
        formData.append("upload_vehicle_registration", isUploadVehicleRegistration ? values.upload_vehicle_registration.files[0] : '');
        formData.append("upload_driver_licence", isUploadDriverLicence ? values.upload_driver_licence.files[0] : '');
        formData.append("upload_inssurance_card", isUploadInsuranceCard ? values.upload_inssurance_card.files[0] : '');

        const result = await addDriver(formData);
        const { data, error } = result;
        if (data) {
          handleAlert(data.userId, "Added Successfull", SUCCESS);
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
  const handleVehicleRegistration = (event: any) => {
    const file = event.target.files[0];
    setIsUploadVehicleRegistration(true);
    validation.setFieldValue('upload_vehicle_registration', event.target)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrlVehicleRegistration(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleDriverLicence = (event: any) => {
    const file = event.target.files[0];
    setIsUploadDriverLicence(true);
    validation.setFieldValue('upload_driver_licence', event.target)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrlDriverLicence(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleInssuranceCard = (event: any) => {
    const file = event.target.files[0];
    setIsUploadInsuranceCard(true);
    validation.setFieldValue('upload_inssurance_card', event.target)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrlInsuranceCard(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Drawer
      anchor='right'
      open={isAdd}
      onClose={handleClose}
    >
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Box sx={{ width: 800, p: 2 }}>
        <Typography variant='h6'>Basic Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ textAlign: "center", margin: "auto" }}>
              <Avatar alt="John" src={previewUrl} id="avatar" sx={{ width: 100, height: 100, margin: "auto", mb: 1, }} />
              <Button component="label" variant="contained" >
                Upload
                <VisuallyHiddenInput type="file" name='profile_picture' onChange={handleProfilePic} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.legal_first_name && validation.errors.legal_first_name)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem' }}>
                First Name
              </Typography>
              <TextField
                variant="outlined"
                name='legal_first_name'
                fullWidth
                size='small'
                value={validation.values.legal_first_name || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.legal_first_name && validation.errors.legal_first_name ? (
                <FormHelperText>{validation.errors.legal_first_name.toString()}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              error={!!(validation.touched.legal_last_name && validation.errors.legal_last_name)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Last Name
              </Typography>
              <TextField
                variant="outlined"
                name='legal_last_name'
                fullWidth
                size='small'
                value={validation.values.legal_last_name || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.legal_last_name && validation.errors.legal_last_name ? (
                <FormHelperText>{validation.errors.legal_last_name.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.legal_middle_name && validation.errors.legal_middle_name)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', }}>
                Middle Name
              </Typography>
              <TextField
                variant="outlined"
                name='legal_middle_name'
                fullWidth
                size='small'
                value={validation.values.legal_middle_name || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.legal_middle_name && validation.errors.legal_middle_name ? (
                <FormHelperText>{validation.errors.legal_middle_name.toString()}</FormHelperText>
              ) : null}
            </FormControl>
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
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.dob && validation.errors.dob)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Date of Birth
              </Typography>
              <TextField
                variant="outlined"
                type='date'
                name='dob'
                fullWidth
                size='small'
                value={validation.values.dob || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.dob && validation.errors.dob ? (
                <FormHelperText>{validation.errors.dob.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4.4} xl={4.4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.gender && validation.errors.gender)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Gender
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={validation.values.gender}
                name="gender"
                onChange={validation.handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {validation.touched.gender && validation.errors.gender ? (
                <FormHelperText>{validation.errors.gender.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3.8} xl={3.8}>
            <FormControl
              fullWidth
              error={!!(validation.touched.ssn && validation.errors.ssn)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                SSN
              </Typography>
              <TextField
                variant="outlined"
                name='ssn'
                fullWidth
                size='small'
                value={validation.values.ssn || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.ssn && validation.errors.ssn ? (
                <FormHelperText>{validation.errors.ssn.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3.8} xl={3.8}>
            <FormControl
              fullWidth
              error={!!(validation.touched.student_id && validation.errors.student_id)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Student Id
              </Typography>
              <TextField
                variant="outlined"
                name='student_id'
                fullWidth
                size='small'
                value={validation.values.student_id || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.student_id && validation.errors.student_id ? (
                <FormHelperText>{validation.errors.student_id.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.university_name && validation.errors.university_name)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                University Name
              </Typography>
              <TextField
                variant="outlined"
                name='university_name'
                fullWidth
                size='small'
                value={validation.values.university_name || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.university_name && validation.errors.university_name ? (
                <FormHelperText>{validation.errors.university_name.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl
              fullWidth
              error={!!(validation.touched.university_address && validation.errors.university_address)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                University Address
              </Typography>
              <TextField
                variant="outlined"
                name='university_address'
                fullWidth
                size='small'
                value={validation.values.university_address || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.university_address && validation.errors.university_address ? (
                <FormHelperText>{validation.errors.university_address.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
            <FormControl
              fullWidth
              error={!!(validation.touched.zip_code && validation.errors.zip_code)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Zip Code
              </Typography>
              <TextField
                variant="outlined"
                name='zip_code'
                fullWidth
                size='small'
                value={validation.values.zip_code || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.zip_code && validation.errors.zip_code ? (
                <FormHelperText>{validation.errors.zip_code.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={3.2} xl={3.2}>
            <FormControl
              fullWidth
              error={!!(validation.touched.destination_contact_number && validation.errors.destination_contact_number)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Destination Contact Number
              </Typography>
              <TextField
                variant="outlined"
                name='destination_contact_number'
                fullWidth
                size='small'
                value={validation.values.destination_contact_number || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.destination_contact_number && validation.errors.destination_contact_number ? (
                <FormHelperText>{validation.errors.destination_contact_number.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4.4} xl={4.4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.gender_preferences && validation.errors.gender_preferences)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Gender Preferences
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={validation.values.gender_preferences}
                name="gender_preferences"
                onChange={validation.handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {validation.touched.gender_preferences && validation.errors.gender_preferences ? (
                <FormHelperText>{validation.errors.gender_preferences.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4.4} xl={4.4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.rider_preference && validation.errors.rider_preference)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Rider Preferences
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={validation.values.rider_preference}
                name="rider_preference"
                onChange={validation.handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {validation.touched.rider_preference && validation.errors.rider_preference ? (
                <FormHelperText>{validation.errors.rider_preference.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant='h6' sx={{ mt: 2 }}>Car Details</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.license_number && validation.errors.license_number)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                License Number
              </Typography>
              <TextField
                variant="outlined"
                name='license_number'
                fullWidth
                size='small'
                value={validation.values.license_number || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.license_number && validation.errors.license_number ? (
                <FormHelperText>{validation.errors.license_number.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.license_state && validation.errors.license_state)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                License State
              </Typography>
              <TextField
                variant="outlined"
                name='license_state'
                fullWidth
                size='small'
                value={validation.values.license_state || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.license_state && validation.errors.license_state ? (
                <FormHelperText>{validation.errors.license_state.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.car_model && validation.errors.car_model)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Car Model
              </Typography>
              <TextField
                variant="outlined"
                name='car_model'
                fullWidth
                size='small'
                value={validation.values.car_model || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.car_model && validation.errors.car_model ? (
                <FormHelperText>{validation.errors.car_model.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <FormControl
              fullWidth
              error={!!(validation.touched.make && validation.errors.make)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Make
              </Typography>
              <TextField
                variant="outlined"
                name='make'
                fullWidth
                size='small'
                value={validation.values.make || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.make && validation.errors.make ? (
                <FormHelperText>{validation.errors.make.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <FormControl
              fullWidth
              error={!!(validation.touched.model && validation.errors.model)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Model
              </Typography>
              <TextField
                variant="outlined"
                name='model'
                fullWidth
                size='small'
                value={validation.values.model || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.model && validation.errors.model ? (
                <FormHelperText>{validation.errors.model.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
            <FormControl
              fullWidth
              error={!!(validation.touched.year && validation.errors.year)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Year
              </Typography>
              <TextField
                variant="outlined"
                name='year'
                fullWidth
                size='small'
                value={validation.values.year || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.year && validation.errors.year ? (
                <FormHelperText>{validation.errors.year.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <FormControl
              fullWidth
              error={!!(validation.touched.vehicle_license_plate_number && validation.errors.vehicle_license_plate_number)}
            >
              <Typography sx={{ fontWeight: 400, color: "#666666", fontSize: '0.875rem', mt: 2 }}>
                Vehicle License Plate Number
              </Typography>
              <TextField
                variant="outlined"
                name='vehicle_license_plate_number'
                fullWidth
                size='small'
                value={validation.values.vehicle_license_plate_number || ''}
                onChange={validation.handleChange}
              />
              {validation.touched.vehicle_license_plate_number && validation.errors.vehicle_license_plate_number ? (
                <FormHelperText>{validation.errors.vehicle_license_plate_number.toString()}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>


        <Grid container sx={{ mt: 2 }} spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ textAlign: "center", margin: "auto" }}>
              <CardMedia
                sx={{ height: 140, mb: 1, }}
                image={previewUrlVehicleRegistration}
                title='upload_vehicle_registration'
              />
              <Button component="label" variant="contained" >
                Upload
                <VisuallyHiddenInput type="file" name='upload_vehicle_registration' onChange={handleVehicleRegistration} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ textAlign: "center", margin: "auto" }}>
              <CardMedia
                sx={{ height: 140, mb: 1 }}
                image={previewUrlDriverLicence}
                title='upload_driver_licence'
              />
              <Button component="label" variant="contained" >
                Upload
                <VisuallyHiddenInput type="file" name='upload_driver_licence' onChange={handleDriverLicence} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Box sx={{ textAlign: "center", margin: "auto" }}>
              <CardMedia
                sx={{ height: 140, mb: 1 }}
                image={previewUrlInsuranceCard}
                title='upload_inssurance_card'
              />
              <Button component="label" variant="contained" >
                Upload
                <VisuallyHiddenInput type="file" name='upload_inssurance_card' onChange={handleInssuranceCard} />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginBottom: "10px", marginRight: "10px", textAlign:"right" }}>
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

export default AddDriver