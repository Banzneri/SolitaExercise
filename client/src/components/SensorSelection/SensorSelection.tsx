import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ChangeEvent, FC } from 'react';

enum Sensor {
  PH = 'ph',
  Rainfall = 'rainfall',
  Temperature = 'temperature',
}

const styles = {
  padding: '1rem 0 1rem 1.5rem',
};

interface SensorSelectionProps {
  handleSensorChange(e: ChangeEvent, val: string): void
}

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
      <FormControlLabel value="any" control={<Radio />} label="any" />
      <FormControlLabel
        value={Sensor.PH}
        control={<Radio />}
        label={Sensor.PH}
      />
      <FormControlLabel
        value={Sensor.Rainfall}
        control={<Radio />}
        label={Sensor.Rainfall}
      />
      <FormControlLabel
        value={Sensor.Temperature}
        control={<Radio />}
        label={Sensor.Temperature}
      />
    </RadioGroup>
  </FormControl>
);

export default SensorSelection;
