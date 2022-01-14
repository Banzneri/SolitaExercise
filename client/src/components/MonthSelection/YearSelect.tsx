import { FC } from 'react';
import {
  FormControl,
  InputLabel, MenuItem, Select,
  SelectChangeEvent,
} from '@mui/material';

interface YearSelectProps {
  handleYearChange(e: SelectChangeEvent<number>): void
  year: number
}

const years = [2018, 2019, 2020, 2021, 2022];

const YearSelect: FC<YearSelectProps> = ({
  handleYearChange,
  year,
}) => (
  <FormControl fullWidth>
    <InputLabel>Year</InputLabel>
    <Select
      labelId="year-select"
      id="year-select"
      onChange={(e) => handleYearChange(e)}
      defaultValue={2019}
      value={year}
    >
      {years.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
    </Select>
  </FormControl>
);

export default YearSelect;
