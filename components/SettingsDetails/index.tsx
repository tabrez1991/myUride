import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Button, Snackbar, Typography, CircularProgress } from '@mui/material'
import React from 'react'
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  MenuButtonStrikethrough,
  type RichTextEditorRef,
} from "mui-tiptap";
import { addDriversAgreement, addPrivacyPolicy, addUserAgreement, addUserGuidlines, deleteDriversAgreement, deletePrivacyPolicy, deleteUserAgreement, deleteUserGuidlines, getSettings, updateDriversAgreement, updatePrivacyPolicy, updateUserAgreement, updateUserGuidlines } from '@/utils';
import { ERROR, SUCCESS } from '@/lib/constants';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);


const SettingsDetails = () => {
  const [submitLoader, setSubmitLoader] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('');
  const [privacyPolicy, setPrivacyPolicy] = React.useState<any>()
  const [userAgreement, setUserAgreement] = React.useState<any>()
  const [userGuidlines, setUserGuidlines] = React.useState<any>()
  const [driversAgreement, setDriversAgreement] = React.useState<any>()
  const [render, setRender] = React.useState<boolean>(false);

  const rteRef = React.useRef<RichTextEditorRef>(null);

  // Privacy policy

  const handleAddPrivacyPolicy = async (details: any) => {
    try {
      const result = await addPrivacyPolicy({ addPrivacyPolicy: details });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Added Successfull", SUCCESS);
        setRender(!render);
        setSubmitLoader(false);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdatePrivacyPolicy = async (id: any, details: any) => {
    try {
      const result = await updatePrivacyPolicy({
        updatePrivacyPolicyId: id,
        updatePrivacyPolicy: details
      });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Updated Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeletePrivacyPolicy = async (details: any) => {
    try {
      const result = await deletePrivacyPolicy(details);
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Deleted Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  // User Agreement

  const handleAddUserAgreement = async (details: any) => {
    try {
      const result = await addUserAgreement({ user_agreement: details });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Added Successfull", SUCCESS);
        setRender(!render);
        setSubmitLoader(false);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateUserAgreement = async (id: any, details: any) => {
    try {
      const result = await updateUserAgreement({
        user_agreement_id: id,
        user_agreement: details
      });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Updated Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteUserAgreement = async (details: any) => {
    try {
      const result = await deleteUserAgreement(details);
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Deleted Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  // User Guidlines

  const handleAddUserGuidlines = async (details: any) => {
    try {
      const result = await addUserGuidlines({ user_guidlines: details });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Added Successfull", SUCCESS);
        setRender(!render);
        setSubmitLoader(false);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateUserGuidlines = async (id: any, details: any) => {
    try {
      const result = await updateUserGuidlines({
        user_guidlines_id: id,
        user_guidlines: details
      });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Updated Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteUserGuidlines = async (details: any) => {
    try {
      const result = await deleteUserGuidlines(details);
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Deleted Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Drivers Agreement

  const handleAddDriversAgrrement = async (details: any) => {
    try {
      const result = await addDriversAgreement({ driver_agreements: details });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Added Successfull", SUCCESS);
        setRender(!render);
        setSubmitLoader(false);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateDriversAgrrement = async (id: any, details: any) => {
    try {
      const result = await updateDriversAgreement({
        driver_agreements_id: id,
        driver_agreements: details
      });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Updated Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteDriversAgrrement = async (details: any) => {
    try {
      const result = await deleteDriversAgreement(details);
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Deleted Successfull", SUCCESS);
        setSubmitLoader(false);
        setRender(!render);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
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

  const getSettingsDetails = async () => {
    setSubmitLoader(true)
    try {
      const result = await getSettings();
      const { data, error } = result;
      if (data) {
        setTimeout(() => {
          setPrivacyPolicy(data?.data.find((item: any) => item.type === "privacy_policy"))
          setUserAgreement(data?.data.find((item: any) => item.type === "user_agreement"))
          setUserGuidlines(data?.data.find((item: any) => item.type === "user_guidlines"))
          setDriversAgreement(data?.data.find((item: any) => item.type === "driver_agreements"))
          setSubmitLoader(false)
        }, 1000);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false)
      }
    } catch (error) {

    }
  }

  React.useEffect(() => {
    getSettingsDetails()
  }, [render])

  return (
    <Box>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Typography variant='h5'>Settings</Typography>
      {submitLoader ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box> : <>
        {/* Privacy Policy */}
        <Accordion
          sx={{
            mb: 3,
            borderRadius: '5px',
            outline: 'none',
            p: 1,
            '&:before': {
              display: 'none',
            },
            mt: 3
          }}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<i className="ri-arrow-down-s-line"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 700 }}>
              Privacy Policy
            </Typography>
          </AccordionSummary>
          {submitLoader ? <>
            <Skeleton variant="rounded" width={"100%"} height={60} />
          </> : <AccordionDetails>
            <RichTextEditor
              ref={rteRef}
              key={privacyPolicy}
              extensions={[StarterKit]}
              content={`<p>${privacyPolicy?.privacy_policy ? privacyPolicy?.privacy_policy : ''}</p>`}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                  <MenuButtonStrikethrough />
                  <MenuDivider />
                </MenuControlsContainer>
              )}
            />

            {privacyPolicy?.privacy_policy ? <>
              <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleUpdatePrivacyPolicy(privacyPolicy?._id, rteRef.current?.editor?.getHTML())}>
                Update
              </Button>
              <Button variant='contained' color='error' sx={{ mt: 2, mr: 2, float: "right" }} onClick={() => handleDeletePrivacyPolicy({
                deletePrivacyPolicyId: privacyPolicy?._id
              })}>
                Delete
              </Button>
            </> : <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleAddPrivacyPolicy(rteRef.current?.editor?.getHTML())}>
              Add
            </Button>}
          </AccordionDetails>}
        </Accordion>
        {/* User Agreement */}
        <Accordion
          sx={{
            mb: 3,
            borderRadius: '5px',
            outline: 'none',
            p: 1,
            '&:before': {
              display: 'none',
            },
            mt: 3
          }}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<i className="ri-arrow-down-s-line"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 700 }}>
              User Agreement
            </Typography>
          </AccordionSummary>
          {submitLoader ? <>
            <Skeleton variant="rounded" width={"100%"} height={60} />
          </> : <AccordionDetails>
            <RichTextEditor
              ref={rteRef}
              key={userAgreement}
              extensions={[StarterKit]}
              content={`<p>${userAgreement?.user_agreement ? userAgreement?.user_agreement : ''}</p>`}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                  <MenuButtonStrikethrough />
                  <MenuDivider />
                </MenuControlsContainer>
              )}
            />

            {userAgreement?.user_agreement ? <>
              <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleUpdateUserAgreement(userAgreement?._id, rteRef.current?.editor?.getHTML())}>
                Update
              </Button>
              <Button variant='contained' color='error' sx={{ mt: 2, mr: 2, float: "right" }} onClick={() => handleDeleteUserAgreement({
                user_agreement_id: userAgreement?._id
              })}>
                Delete
              </Button>
            </> : <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleAddUserAgreement(rteRef.current?.editor?.getHTML())}>
              Add
            </Button>}
          </AccordionDetails>}
        </Accordion>
        {/* User Guidlines */}
        <Accordion
          sx={{
            mb: 3,
            borderRadius: '5px',
            outline: 'none',
            p: 1,
            '&:before': {
              display: 'none',
            },
            mt: 3
          }}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<i className="ri-arrow-down-s-line"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 700 }}>
              User Guidlines
            </Typography>
          </AccordionSummary>
          {submitLoader ? <>
            <Skeleton variant="rounded" width={"100%"} height={60} />
          </> : <AccordionDetails>
            <RichTextEditor
              ref={rteRef}
              key={userGuidlines}
              extensions={[StarterKit]}
              content={`<p>${userGuidlines?.user_guidlines ? userGuidlines?.user_guidlines : ''}</p>`}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                  <MenuButtonStrikethrough />
                  <MenuDivider />
                </MenuControlsContainer>
              )}
            />

            {userGuidlines?.user_guidlines ? <>
              <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleUpdateUserGuidlines(userGuidlines?._id, rteRef.current?.editor?.getHTML())}>
                Update
              </Button>
              <Button variant='contained' color='error' sx={{ mt: 2, mr: 2, float: "right" }} onClick={() => handleDeleteUserGuidlines({
                user_guidlines_id: userGuidlines?._id
              })}>
                Delete
              </Button>
            </> : <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleAddUserGuidlines(rteRef.current?.editor?.getHTML())}>
              Add
            </Button>}
          </AccordionDetails>}
        </Accordion>
        {/* User Agreement */}
        <Accordion
          sx={{
            mb: 3,
            borderRadius: '5px',
            outline: 'none',
            p: 1,
            '&:before': {
              display: 'none',
            },
            mt: 3
          }}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<i className="ri-arrow-down-s-line"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 700 }}>
              Drivers Agreement
            </Typography>
          </AccordionSummary>
          {submitLoader ? <>
            <Skeleton variant="rounded" width={"100%"} height={60} />
          </> : <AccordionDetails>
            <RichTextEditor
              ref={rteRef}
              key={driversAgreement}
              extensions={[StarterKit]}
              content={`<p>${driversAgreement?.driver_agreements ? driversAgreement?.driver_agreements : ''}</p>`}
              renderControls={() => (
                <MenuControlsContainer>
                  <MenuSelectHeading />
                  <MenuDivider />
                  <MenuButtonBold />
                  <MenuButtonItalic />
                  <MenuButtonStrikethrough />
                  <MenuDivider />
                </MenuControlsContainer>
              )}
            />

            {driversAgreement?.driver_agreements ? <>
              <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleUpdateDriversAgrrement(driversAgreement?._id, rteRef.current?.editor?.getHTML())}>
                Update
              </Button>
              <Button variant='contained' color='error' sx={{ mt: 2, mr: 2, float: "right" }} onClick={() => handleDeleteDriversAgrrement({
                driver_agreements_id: driversAgreement?._id
              })}>
                Delete
              </Button>
            </> : <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleAddDriversAgrrement(rteRef.current?.editor?.getHTML())}>
              Add
            </Button>}
          </AccordionDetails>}
        </Accordion>
      </>}
    </Box>
  )
}

export default SettingsDetails