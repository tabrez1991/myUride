import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Button, Snackbar, Typography, Modal, Paper } from '@mui/material'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { addFaq, deleteFaq, getFaqsList, updateFaq } from '@/utils';
import { ERROR, SUCCESS } from '@/lib/constants';
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '90vh',
  width: '800px',
  height: '364px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: 'none !important',
  p: 4,
  outline: 'none',
};

const Faqs = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [submitLoader, setSubmitLoader] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = React.useState('');
  const [faqsList, setFaqsList] = React.useState<any[]>([]);
  const [render, setRender] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [pageTotal, setPageTotal] = React.useState<number>(100)
  const [isAdd, setIsAdd] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<any>('');

  const rteRef1 = React.useRef<RichTextEditorRef>(null);
  const rteRef2 = React.useRef<RichTextEditorRef>(null);
  const rteRef3 = React.useRef<RichTextEditorRef>(null);
  const rteRef4 = React.useRef<RichTextEditorRef>(null);

  const handleAddFaqs = async (details: any) => {
    try {
      const result = await addFaq({
        "questions": details?.question,
        "answer": details?.answer,
        "category": "driver"
      });
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

  const handleUpdateFaqs = async (details: any) => {
    try {
      const result = await updateFaq({
        "id": details?.id,
        "questions": details?.question,
        "answer": details?.answer,
        "category": "driver"
      });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Updated Successfull", SUCCESS);
        setRender(!render);
        setIsEdit(false);
        setSelectedId('');
        setSubmitLoader(false);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteFaqs = async (details: any) => {
    try {
      const result = await deleteFaq({
        "id": details?.id
      });
      const { data, error } = result;
      if (data) {
        handleAlert(data.userId, "Deleted Successfull", SUCCESS);
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

  const getFaqsDetails = async () => {
    setSubmitLoader(true)
    try {
      const result = await getFaqsList(page, pageSize, searchValue);
      const { data, error } = result;
      if (data) {
        setTimeout(() => {
          setFaqsList(data?.data);
          setSubmitLoader(false)
        }, 1000);
      } else {
        handleAlert(error.statusCode, error.message, ERROR);
        setSubmitLoader(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getFaqsDetails()
  }, [render])

  return (
    <Box>
      <Snackbar open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '338px', background: '#404040', color: '#fff', alignItems: 'center' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant='h5'>Faqs</Typography>
        <Button variant='contained' sx={{ textTransform: "none" }} onClick={() => setIsAdd(true)}>Add Faqs</Button>
      </Box>
      {submitLoader ? <>
        <Skeleton variant="rounded" width={"100%"} height={60} />
        <Skeleton variant="rounded" width={"100%"} height={60} sx={{ mt: 1 }} />
        <Skeleton variant="rounded" width={"100%"} height={60} sx={{ mt: 1 }} />
        <Skeleton variant="rounded" width={"100%"} height={60} sx={{ mt: 1 }} />
        <Skeleton variant="rounded" width={"100%"} height={60} sx={{ mt: 1 }} />
      </> : faqsList.map((item: any, i: number) => <Accordion key={item?._id}
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
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography sx={{ fontWeight: 700, mr: 1 }}>Q:{i + 1}</Typography>{!(isEdit && selectedId === item?._id) ? <Typography sx={{ fontWeight: 700 }} dangerouslySetInnerHTML={{
              __html: ` ${item?.queston}`
            }}>
            </Typography> : <Box sx={{ width: "100%" }}>
              <RichTextEditor
                ref={rteRef3}
                extensions={[StarterKit]}
                content={`<p>${item?.queston}</p>`}
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
            </Box>}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 700, mr: 1 }}>A:</Typography> {!(isEdit && selectedId === item?._id) ? <Typography sx={{ fontWeight: 400 }} dangerouslySetInnerHTML={{
              __html: ` ${item?.answer}`
            }}>
            </Typography> : <Box sx={{ width: "100%" }}><RichTextEditor
              ref={rteRef4}
              extensions={[StarterKit]}
              content={`<p>${item?.answer}</p>`}
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
            </Box>}
          </Box>

          <>
            {!(isEdit && selectedId === item?._id) ? <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => {
              setIsEdit(true);
              setSelectedId(item?._id)
            }}>
              Edit
            </Button> : <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleUpdateFaqs({
              id: item?._id,
              question: rteRef3.current?.editor?.getHTML(),
              answer: rteRef4.current?.editor?.getHTML()
            })}>
              Update
            </Button>}
            <Button variant='contained' color='error' sx={{ mt: 2, mr: 2, float: "right" }} onClick={() => handleDeleteFaqs({
              id: item?._id,
            })}>
              Delete
            </Button>
          </>
        </AccordionDetails>
      </Accordion>)}
      {isAdd && <Modal
        open={isAdd}
        onClose={() => setIsAdd(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ border: 'none' }}
      >
        <Box sx={style}>
          <Typography sx={{ fontWeight: 700 }}>
            Question
          </Typography>
          <RichTextEditor
            ref={rteRef1}
            extensions={[StarterKit]}
            content={`<p></p>`}
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
          <Typography sx={{ fontWeight: 700, mt: 2 }}>
            Answer
          </Typography>
          <RichTextEditor
            ref={rteRef2}
            extensions={[StarterKit]}
            content={`<p></p>`}
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
          <Button variant='contained' sx={{ mt: 2, float: "right" }} onClick={() => handleAddFaqs({
            question: rteRef1.current?.editor?.getHTML(),
            answer: rteRef2.current?.editor?.getHTML()
          })}>
            Add
          </Button>
        </Box>
      </Modal>}
    </Box>
  )
}

export default Faqs