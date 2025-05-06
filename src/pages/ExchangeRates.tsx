import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Container,
  Box,
  TablePagination,
} from '@mui/material';
import useExchangeRates from '../hooks/useExchangeRates';
export default function ExchangeRates() {
  const { data, loading, error } = useExchangeRates();
  const rates = data?.conversion_rates || {};

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const entries = Object.entries(rates);
  const paginatedRows = entries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) return <Typography sx={{ mt: 4 }}>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <TableContainer
        component={Paper}
        className="mt-28 lg:max-h-[500px] max-h-[800px]"
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          Currency Rates (Base: {data?.base_code})
        </Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Currency</strong>
              </TableCell>
              <TableCell>
                <strong>Rate</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map(([currency, rate]) => (
              <TableRow key={currency}>
                <TableCell>{currency}</TableCell>
                <TableCell>{rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={entries.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          padding: {
            xs: '4px 8px', // Small padding on extra small screens (mobile)
            sm: '8px 16px', // Default padding on small and up
          },
          '& .MuiTablePagination-toolbar': {
            gap: {
              xs: 0, // reduce gap on mobile
              sm: 2,
            },
            paddingLeft: {
              xs: 0,
            },
          },
          '& .MuiTablePagination-actions': {
            marginLeft: {
              xs: 0,
            },
          },
        }}
      />
    </Container>
  );
}
