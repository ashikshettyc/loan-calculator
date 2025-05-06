import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import AmortizationTable from './AmortizationTable';

type ScheduleItem = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
};

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

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const onSubmit = (values: FormInputs) => {
    const { loanAmount, interestRate, termYears } = values;
    const P = +loanAmount;
    const r = interestRate / 12 / 100;
    const n = termYears * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let balance = P;
    const generated: ScheduleItem[] = [];

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance -= principal;
      generated.push({
        month: i,
        principal,
        interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setSchedule(generated);
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
          <AmortizationTable
            schedule={schedule}
            onReset={() => setSchedule([])}
          />
        </Box>
      )}
    </Box>
  );
}
