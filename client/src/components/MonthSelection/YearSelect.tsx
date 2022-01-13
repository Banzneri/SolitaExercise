import { FC } from 'react';
import {
  SelectChangeEvent,
} from '@mui/material';

interface YearSelectProps {
  handleYearChange(e: SelectChangeEvent<number>): void
}

const YearSelect: FC<YearSelectProps> = ({
  handleYearChange,
}) => (
  <p>dd</p>
);

export default YearSelect;
