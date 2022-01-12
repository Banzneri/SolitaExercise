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

interface SensorSelectionProps {
  handleSensorChange(e: ChangeEvent): void
}

const SensorSelection: FC<SensorSelectionProps> = ({
  handleSensorChange,
}) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Sensors</FormLabel>
    <RadioGroup
      row
      aria-label="sensor"
      defaultValue="any"
      name="radio-buttons-group"
      onChange={(e) => handleSensorChange(e)}
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
