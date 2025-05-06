import { useState } from 'react';

export interface FormInputs {
  loanAmount: number;
  interestRate: number;
  termYears: number;
}

export interface ScheduleItem {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export const useEmiCalculation = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const calculateSchedule = (values: FormInputs) => {
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

  const resetSchedule = () => setSchedule([]);

  return {
    schedule,
    calculateSchedule,
    resetSchedule,
  };
};
