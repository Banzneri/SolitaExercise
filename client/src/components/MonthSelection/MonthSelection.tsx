import { FC } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';

interface MonthSelectionProps {
  handleYearChange(e: SelectChangeEvent<number>): void
  handleMonthChange(e: SelectChangeEvent<number>): void
  year: number
  month: number
  show: boolean
}

const MonthSelection: FC<MonthSelectionProps> = ({
  handleYearChange,
  handleMonthChange,
  year,
  month,
  show,
}) => {
  if (!show) return null;
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <YearSelect handleYearChange={handleYearChange} year={year} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MonthSelect handleMonthChange={handleMonthChange} month={month} />
      </Grid>
    </Grid>
  );
};

export default MonthSelection;
