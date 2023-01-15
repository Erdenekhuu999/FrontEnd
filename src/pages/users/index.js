import Grid from '@mui/material/Grid'
import UserTable from 'src/views/tables/UserTable'
import Button from '@mui/material/Button'
import React from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'
import Close from 'mdi-material-ui/Close'

import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '25%',
  left: '30%'
};

const CardBasic = () => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      unit: values.unit,
      password: values.password,
      jobrole: values.jobrole,
      roles: ["user"]
    };
    fetch('http://localhost:8080/api/auth/signup', {
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
        setAlertMessage("Хэрэглэгч амжилттай нэмэгдлээ. Хуудсаа шинэчилнэ үү.");
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
    username: '',
    email: '',
    phone: '',
    unit: '',
    password: '',
    jobrole: ''
  })

  const handleNameChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

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
        <UserTable />
      </Grid>
      <Grid item xs={12}>
        <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleOpen}>
          Шинэ Хэрэглэгч Нэмэх
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid item xs={5} sx={style}>
            <Card>
              <CardHeader title='Хэрэглэгч нэмэх' titleTypographyProps={{ variant: 'h6' }} />
              <form onSubmit={e => e.preventDefault()}>
                <CardContent>

                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Овог нэр' placeholder='Овог нэр' value={values.username} onChange={handleNameChange('username')} type={values.username ? 'text' : 'username'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Имэйл хаяг' placeholder='Имэйл хаяг' value={values.email} onChange={handleNameChange('email')} type={values.email ? 'text' : 'email'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Утасны дугаар' placeholder='Утасны дугаар' value={values.phone} onChange={handleNameChange('phone')} type={values.phone ? 'text' : 'phone'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Алба нэгж' placeholder='Алба нэгж' value={values.unit} onChange={handleNameChange('unit')} type={values.unit ? 'text' : 'unit'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Албан тушаал' placeholder='Албан тушаал' value={values.jobrole} onChange={handleNameChange('jobrole')} type={values.jobrole ? 'text' : 'jobrole'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Нууц үг' placeholder='Нууц үг' value={values.password} onChange={handleNameChange('password')} type={values.password ? 'text' : 'password'} />
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
