import { FC } from 'react';
import {
  FormControl,
  InputLabel, MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface MonthSelectProps {
  handleMonthChange(e: SelectChangeEvent<number>): void
  month: number
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MonthSelect: FC<MonthSelectProps> = ({
  handleMonthChange,
  month,
}) => (
  <FormControl fullWidth>
    <InputLabel>Month</InputLabel>
    <Select
      labelId="month-select"
      id="month-select"
      onChange={(e) => handleMonthChange(e)}
      defaultValue={1}
      value={month}
    >
      {months.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
    </Select>
  </FormControl>
);

export default MonthSelect;
