import { FC } from 'react';
import { Collapse, Grid, SelectChangeEvent } from '@mui/material';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';

interface MonthSelectionProps {
  handleYearChange(e: SelectChangeEvent<number>): void
  handleMonthChange(e: SelectChangeEvent<number>): void
  show: boolean
}

const MonthSelection: FC<MonthSelectionProps> = ({
  handleYearChange,
  handleMonthChange,
  show,
}) => (
  <Collapse in={show}>
    <Grid container>
      <Grid item xs={12} md={6}>
        <YearSelect handleYearChange={handleYearChange} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MonthSelect handleMonthChange={handleMonthChange} />
      </Grid>
    </Grid>
    <br />
    <br />
  </Collapse>
);

export default MonthSelection;
