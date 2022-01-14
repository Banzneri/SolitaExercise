import { FC } from 'react';
import { Chip, Collapse, Typography } from '@mui/material';

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
}) => (
  <Typography sx={{ marginTop: 3 }} variant="body1">
    <Collapse in={show} orientation="horizontal">
      <Chip label={`Avg: ${Math.round(average * 100) / 100} | Min: ${min} | Max: ${max}`} />
    </Collapse>
  </Typography>
);

export default AggregateData;
