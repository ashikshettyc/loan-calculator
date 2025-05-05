import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';

interface FormInputs {
  loanAmount: string;
  interestRate: string;
  termYears: string;
}

const LoanCalculatorForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onChange' });

  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = (P: number, R: number, N: number): number => {
    const r = R / 12 / 100;
    const n = N * 12;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const onSubmit = (data: FormInputs) => {
    const { loanAmount, interestRate, termYears } = data;
    const emiResult = calculateEMI(+loanAmount, +interestRate, +termYears);
    setEmi(Number(emiResult.toFixed(2)));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        maxWidth: 600,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Controller
            name="loanAmount"
            control={control}
            defaultValue=""
            rules={{
              required: 'Loan amount is required',
              validate: (value) => {
                if (isNaN(Number(value)))
                  return 'Please enter a valid loan amount';
                if (Number(value) <= 0)
                  return 'Loan amount must be greater than 0';
                return true;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Loan Amount"
                variant="outlined"
                fullWidth
                error={!!errors.loanAmount}
                helperText={errors.loanAmount?.message}
              />
            )}
          />

          <Controller
            name="interestRate"
            control={control}
            defaultValue=""
            rules={{
              required: 'Interest rate is required',
              validate: (value) =>
                (!isNaN(Number(value)) && Number(value) > 0) ||
                'Interest rate must be a number greater than 0',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Interest Rate (%)"
                variant="outlined"
                fullWidth
                error={!!errors.interestRate}
                helperText={errors.interestRate?.message}
              />
            )}
          />

          <Controller
            name="termYears"
            control={control}
            defaultValue=""
            rules={{
              required: 'Term is required',
              validate: (value) =>
                (!isNaN(Number(value)) && Number(value) > 0) ||
                'Term must be a number greater than 0',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Term (Years)"
                variant="outlined"
                fullWidth
                error={!!errors.termYears}
                helperText={errors.termYears?.message}
              />
            )}
          />
        </Box>

        <Button variant="contained" type="submit" sx={{ mt: 3 }}>
          Calculate EMI
        </Button>
      </form>

      {emi !== null && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Monthly EMI: ${emi}
        </Typography>
      )}
    </Box>
  );
};

export default LoanCalculatorForm;
