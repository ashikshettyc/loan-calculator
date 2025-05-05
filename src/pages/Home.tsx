import { Container, Typography } from '@mui/material';
import React from 'react';
import LoanCalculatorForm from '../components/InputForm';

export default function Home() {
  return (
    <Container
      sx={{
        mt: 10,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: '2rem',
          },
        }}
      >
        Loan Calculator Dashboard
      </Typography>
      <LoanCalculatorForm />
    </Container>
  );
}
