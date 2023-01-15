import Grid from '@mui/material/Grid'
import BookTable from 'src/views/tables/BookTable'
import Button from '@mui/material/Button'
import React, { Fragment, useState } from "react";
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'
import Close from 'mdi-material-ui/Close'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import MomentUtils from '@date-io/moment';

import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

const style = {
  position: 'absolute',
  top: '25%',
  left: '30%'
};

const CardBasic = () => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      bookuser: values.bookuser,
      bookstart: StartDate,
      bookend: EndDate,
      bookcarmodel: values.bookcarmodel,
      bookcarnumber: values.bookcarnumber,
      bookstatus: "pending"
    };
    fetch('http://localhost:5000/api/setbook', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        setOpen(false);
        setAlertMessage("Хүсэлт амжилттай илгээгдлээ. Хуудсаа шинэчилнэ үү.");
        setOpenAlert(true);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("Your default message.");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    bookuser: '',
    bookstart: '',
    bookend: '',
    bookcarmodel: '',
    bookcarnumber: ''
  })

  const handleNameChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const [StartDate, handleStartDateChange] = useState(new Date());
  const [EndDate, handleEndDateChange] = useState(new Date());

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {openAlert ? (
          <Alert
            severity='success'
            sx={{ '& a': { fontWeight: 400 } }}
            action={
              <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                <Close fontSize='inherit' />
              </IconButton>
            }
          >
            <AlertTitle>{alertMessage}</AlertTitle>
          </Alert>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <BookTable />
      </Grid>
      <Grid item xs={12}>
        <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleOpen}>
          Хүсэлт Илгээх
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid item xs={5} sx={style}>
            <Card>
              <CardHeader title='Хүсэлт илгээх' titleTypographyProps={{ variant: 'h6' }} />
              <form onSubmit={e => e.preventDefault()}>
                <CardContent>

                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: "40px" }}>
                        <DateTimePicker
                          label='Эхлэх хугацаа'
                          value={StartDate}
                          onChange={handleStartDateChange}
                          renderInput={({ inputProps, ...restParams }) => (
                            <TextField
                              {...restParams}
                              inputProps={{
                                ...inputProps,
                                placeholder: "Эхлэх хугацаа",
                              }}
                              style={{ width: "198px" }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: "40px" }}>
                        <DateTimePicker
                          label='Дуусах хугацаа'
                          value={EndDate}
                          onChange={handleEndDateChange}
                          renderInput={({ inputProps, ...restParams }) => (
                            <TextField
                              {...restParams}
                              inputProps={{
                                ...inputProps,
                                placeholder: "Дуусах хугацаа",
                              }}
                              style={{ width: "198px" }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Овог нэр' placeholder='Овог нэр' value={values.bookuser} onChange={handleNameChange('bookuser')} type={values.bookuser ? 'text' : 'bookuser'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Машины марк' placeholder='Машины марк' value={values.bookcarmodel} onChange={handleNameChange('bookcarmodel')} type={values.bookcarmodel ? 'text' : 'bookcarmodel'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Машины дугаар' placeholder='Машины дугаар' value={values.bookcarnumber} onChange={handleNameChange('bookcarnumber')} type={values.bookcarnumber ? 'text' : 'bookcarnumber'} />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit}>
                    Нэмэх
                  </Button>
                  <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                    Цуцлах
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  )
}

export default CardBasic
