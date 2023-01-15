import Grid from '@mui/material/Grid'
import CarTable from 'src/views/tables/CarTable'
import Button from '@mui/material/Button'
import React from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'
import Close from 'mdi-material-ui/Close'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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
      carnumber: values.carnumber,
      carmodel: values.carmodel,
      carseat: values.carseat,
      carstatus: values.carstatus
    };
    fetch('http://localhost:5000/api/setcar', {
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
        setAlertMessage("Машин амжилттай нэмэгдлээ. Хуудсаа шинэчилнэ үү.");
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
    carnumber: '',
    carmodel: '',
    carseat: '',
    carstatus: ''
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
        <CarTable />
      </Grid>
      <Grid item xs={12}>
        <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleOpen}>
          Шинэ Машин Нэмэх
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid item xs={5} sx={style}>
            <Card>
              <CardHeader title='Машин нэмэх' titleTypographyProps={{ variant: 'h6' }} />
              <form onSubmit={e => e.preventDefault()}>
                <CardContent>

                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Машины дугаар' placeholder='Машины дугаар' value={values.carnumber} onChange={handleNameChange('carnumber')} type={values.carnumber ? 'text' : 'carnumber'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Машины марк' placeholder='Машины марк' value={values.carmodel} onChange={handleNameChange('carmodel')} type={values.carmodel ? 'text' : 'carmodel'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Машины суудал' placeholder='Машины суудал' value={values.carseat} onChange={handleNameChange('carseat')} type={values.carseat ? 'text' : 'carseat'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Машины төлөв</InputLabel>
                        <Select label='Машины төлөв' defaultValue='Чөлөөтэй' value={values.carstatus} onChange={handleNameChange('carstatus')}>
                          <MenuItem value='Чөлөөтэй'>Чөлөөтэй</MenuItem>
                          <MenuItem value='Завгүй'>Завгүй</MenuItem>
                          <MenuItem value='Засвартай'>Засвартай</MenuItem>
                        </Select>
                      </FormControl>
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
