import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import useExchangeRates from '../hooks/useExchangeRates';

const currencyOptions = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'INR', label: 'INR (₹)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'JPY', label: 'JPY (¥)' },
  { value: 'AUD', label: 'AUD (A$)' },
  { value: 'CAD', label: 'CAD (C$)' },
];

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
};

interface ScheduleItem {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Props {
  schedule: ScheduleItem[];
  onReset: () => void;
}

export default function AmortizationTable({ schedule, onReset }: Props) {
  const [currency, setCurrency] = useState('USD');
  const { data, loading, error } = useExchangeRates();
  const rate = data?.conversion_rates?.[currency] ?? 1;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {currencyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" onClick={onReset}>
          Reset Table
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Amortization Schedule ({currency})
      </Typography>

      {loading && <Typography>Loading exchange rates...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell>
                  {currencySymbols[currency]}
                  {(row.principal * rate).toFixed(2)}
                </TableCell>
                <TableCell>
                  {currencySymbols[currency]}
                  {(row.interest * rate).toFixed(2)}
                </TableCell>
                <TableCell>
                  {currencySymbols[currency]}
                  {(row.balance * rate).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
