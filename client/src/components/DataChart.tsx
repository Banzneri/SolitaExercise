import { FC, useEffect, useState } from 'react';
import { FarmData } from '../types/types';
import { getDataByFarmId, getMonthlyData } from '../services/DataService';

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
      const d = byMonth
        ? await getMonthlyData(farmId, year, month, undefined, sensorType)
        : await getDataByFarmId(farmId, undefined, sensorType);
      setData(d);
    };
    update();
  }, []);

  return (
    <p>{data}</p>
  );
};

export default DataChart;
