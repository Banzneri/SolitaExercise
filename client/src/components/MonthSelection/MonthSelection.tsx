import { FC } from 'react';
import { Container, SelectChangeEvent } from '@mui/material';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';

interface MonthSelectionProps {
  handleYearChange(e: SelectChangeEvent<number>): void
  handleMonthChange(e: SelectChangeEvent<number>): void
}

const MonthSelection: FC<MonthSelectionProps> = ({
  handleYearChange,
  handleMonthChange,
}) => (
  <Container>
    <YearSelect handleYearChange={handleYearChange} />
    <br />
    <br />
    <MonthSelect handleMonthChange={handleMonthChange} />
    <br />
    <br />
  </Container>
);

export default MonthSelection;
