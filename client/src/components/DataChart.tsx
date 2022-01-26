import { FC, useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import { Container, Typography } from '@mui/material';
import { FarmData } from '../types/types';
import { getData } from '../services/DataService';

interface DataChartProps {
  farmId: number
  month: number
  year: number
  byMonth: boolean
  sensor: string
}

const DataChart: FC<DataChartProps> = ({
  farmId,
  month,
  year,
  byMonth,
  sensor,
}) => {
  const [data, setData] = useState<FarmData[]>([]);

  useEffect(() => {
    const update = async () => {
      const sensorType = sensor === 'any' ? undefined : sensor;
      if (sensorType) {
        const d = await getData(farmId, undefined, sensorType, byMonth, year, month);
        setData(d);
      }
    };
    update();
  }, []);

  if (!data) return null;

  return (
    <Container>
      <Typography variant="body2">
        {sensor}
        {byMonth ? `${month}` : 'All time'}
      </Typography>
      <LineChart width={1000} height={700} data={data.map((e) => e.value)}>
        <XAxis dataKey="dateTime" />
        <YAxis dataKey="value" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </Container>
  );
};

export default DataChart;
