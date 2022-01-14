import { FC } from 'react';
import { Typography } from '@mui/material';

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
  <Typography sx={{ marginTop: 3 }} variant="body1">
    {`Avg: ${Math.round(average * 100) / 100} | Min: ${min} | Max: ${max}`}
  </Typography>
);

export default AggregateData;
