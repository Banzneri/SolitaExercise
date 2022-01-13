import { FC } from 'react';
import {
  FormControl,
  InputLabel, MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface MonthSelectProps {
  handleMonthChange(e: SelectChangeEvent<number>): void
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MonthSelect: FC<MonthSelectProps> = ({
  handleMonthChange,
}) => (
  <FormControl fullWidth>
    <InputLabel>Farms</InputLabel>
    <Select
      labelId="farm-select"
      id="farm-select"
      onChange={(e) => handleMonthChange(e)}
      defaultValue={1}
    >
      <MenuItem value={0}>Any</MenuItem>
      {months.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
    </Select>
  </FormControl>
);
