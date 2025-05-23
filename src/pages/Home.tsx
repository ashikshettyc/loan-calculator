import { Container, Typography } from '@mui/material';
import LoanCalculatorForm from '../components/InputForm';

export default function Home() {
  return (
    <Container
      sx={{
        mt: 10,
      }}
      className="flex flex-col gap-4"
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
