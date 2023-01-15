// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import { useEffect, useState } from 'react';

const statusObj = {
  'On a trip': { color: 'info' },
  'declined': { color: 'error' },
  current: { color: 'primary' },
  'pending': { color: 'warning' },
  'accepted': { color: 'success' }
}

const DashboardTable = () => {
  const [loading, setLoading] = useState(true);
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    async function fetchCabs() {
      const res = await fetch('http://localhost:5000/api/getbook');
      const data = await res.json();
      setCabs(data);
      setLoading(false);
    }
    fetchCabs();
  }, []);

return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
              <TableCell>Хэрэглэгч</TableCell>
              <TableCell>Эхлэх хугацаа</TableCell>
              <TableCell>Дуусах хугацаа</TableCell>
            <TableCell>Машины марк</TableCell>
            <TableCell>Машины дугаар</TableCell>
              <TableCell>Төлөв</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabs.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.bookuser}</TableCell>
                <TableCell>{row.bookstart}</TableCell>
                <TableCell>{row.bookend}</TableCell>
                <TableCell>{row.bookcarmodel}</TableCell>
                <TableCell>{row.bookcarnumber}</TableCell>
                <TableCell>
                  <Chip
                    label={row.bookstatus}
                    color={statusObj[row.bookstatus].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
