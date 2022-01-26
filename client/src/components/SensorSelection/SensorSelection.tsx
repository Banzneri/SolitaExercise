import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ChangeEvent, FC } from 'react';

const styles = {
  padding: '1rem 0 1rem 1.5rem',
};

interface SensorSelectionProps {
  handleSensorChange(e: ChangeEvent, val: string): void
}

const sensors = ['any', 'ph', 'rainfall', 'temperature'];

const SensorSelection: FC<SensorSelectionProps> = ({
  handleSensorChange,
}) => (
  <FormControl sx={styles} component="fieldset">
    <RadioGroup
      row
      aria-label="sensor"
      defaultValue="any"
      name="radio-buttons-group"
      onChange={(e, val) => handleSensorChange(e, val)}
    >
      {sensors.map((e) => (
        <FormControlLabel
          value={e}
          control={<Radio />}
          label={e}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default SensorSelection;
