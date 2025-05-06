import { Box, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import AmortizationTable from './AmortizationTable';
import { useEmiCalculation } from '../hooks/useEmiCalculation';

type FormInputs = {
  loanAmount: number;
  interestRate: number;
  termYears: number;
};

export default function LoanCalculatorForm() {
  const { control, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      loanAmount: 10000,
      interestRate: 6,
      termYears: 2,
    },
  });

  const { calculateSchedule, resetSchedule, schedule } = useEmiCalculation();
  const onSubmit = (values: FormInputs) => {
    calculateSchedule(values);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Controller
            name="loanAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Loan Amount"
                fullWidth
                type="number"
              />
            )}
          />
          <Controller
            name="interestRate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Interest Rate (%)"
                fullWidth
                type="number"
              />
            )}
          />
          <Controller
            name="termYears"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Term (Years)"
                fullWidth
                type="number"
              />
            )}
          />
        </Box>

        <Button variant="contained" type="submit">
          Calculate
        </Button>
      </form>

      {schedule.length > 0 && (
        <Box mt={4}>
          <AmortizationTable schedule={schedule} onReset={resetSchedule} />
        </Box>
      )}
    </Box>
  );
}
