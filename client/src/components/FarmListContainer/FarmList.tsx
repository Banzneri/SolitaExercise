import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';
import { Farm } from '../../types/types';

interface FarmListProps {
  farms: Farm[],
  handleFarmChange(e: SelectChangeEvent<unknown>): void
}

const FarmList: FC<FarmListProps> = ({ farms, handleFarmChange }) => (
  <FormControl fullWidth>
    <InputLabel>Farms</InputLabel>
    <Select
      labelId="farm-select"
      id="farm-select"
      onChange={(e) => handleFarmChange(e)}
      defaultValue={1}
    >
      {farms.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
    </Select>
  </FormControl>
);

export default FarmList;
