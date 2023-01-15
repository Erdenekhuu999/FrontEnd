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
  'Засвартай': { color: 'error' },
  current: { color: 'primary' },
  'Завгүй': { color: 'warning' },
  'Чөлөөтэй': { color: 'success' }
}

const CarTable = () => {
  const [loading, setLoading] = useState(true);
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    async function fetchCabs() {
      const res = await fetch('http://localhost:5000/api/getcar');
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
            <TableCell>Машины дугаар</TableCell>
              <TableCell>Машины марк</TableCell>
              <TableCell>Машины суудал</TableCell>
              <TableCell>Машины төлөв</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabs.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.carnumber}</TableCell>
                <TableCell>{row.carmodel}</TableCell>
                <TableCell>{row.carseat}</TableCell>
                <TableCell>
                  <Chip
                    label={row.carstatus}
                    color={statusObj[row.carstatus].color}
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

export default CarTable
