import { ChangeEvent, FC } from 'react';
import { Container, SelectChangeEvent } from '@mui/material';
import YearSelect from './YearSelect';

interface MonthSelectionProps {
  handleYearChange(e: SelectChangeEvent<number>): void
  handleMonthChange(e: ChangeEvent, value: number): void
}

const MonthSelection: FC<MonthSelectionProps> = ({
  handleYearChange,
  handleMonthChange,
}) => (
  <Container>
    <YearSelect handleYearChange={handleYearChange} />
  </Container>
);

export default MonthSelection;
