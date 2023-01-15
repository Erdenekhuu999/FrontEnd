import Grid from '@mui/material/Grid'
import Calendar from 'src/views/dashboard/Calendar'
import React from 'react';
import Card from '@mui/material/Card'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Calendar />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
