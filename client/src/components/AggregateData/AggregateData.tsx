import { FC } from 'react';
import { Chip } from '@mui/material';

interface AggregateDataProps {
  average: number
  min: number
  max: number
  show: boolean
}

const AggregateData: FC<AggregateDataProps> = ({
  average,
  min,
  max,
  show,
}) => {
  if (!show) return null;
  return (
    <Chip
      sx={{ marginTop: 2.5 }}
      label={`Avg: ${Math.round(average * 100) / 100} | Min: ${min} | Max: ${max}`}
    />
  );
};

export default AggregateData;
