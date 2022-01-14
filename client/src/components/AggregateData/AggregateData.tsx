import { FC } from 'react';
import { Chip, Collapse } from '@mui/material';

interface AggregateDataProps {
  average: number
  min: number
  max: number
}

const AggregateData: FC<AggregateDataProps> = ({
  average,
  min,
  max,
}) => (
  <Chip
    sx={{ marginTop: 3 }}
    label={`Avg: ${Math.round(average * 100) / 100} | Min: ${min} | Max: ${max}`}
  />
);

export default AggregateData;
