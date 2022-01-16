import { ChangeEvent, useEffect, useState } from 'react';
import {
  Container, FormControlLabel, Grid,
  SelectChangeEvent, Switch,
  Typography,
} from '@mui/material';
import { FarmData } from './types/types';
import DataTable from './components/DataTable/DataTable';
import {
  getAverage, getMinMax, getData, getNumOfRecords,
} from './services/DataService';
import FarmListContainer from './components/FarmListContainer/FarmListContainer';
import SensorSelection from './components/SensorSelection/SensorSelection';
import MonthSelection from './components/MonthSelection/MonthSelection';
import AggregateData from './components/AggregateData/AggregateData';
import DataChart from './components/DataChart';

const perPage = 15;

const App = () => {
  const [data, setData] = useState<FarmData[]>([]);
  const [farmId, setFarmId] = useState<number>(1);
  const [sensor, setSensor] = useState<string>('any');
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [byMonth, setByMonth] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2019);
  const [month, setMonth] = useState<number>(1);
  const [average, setAverage] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const handleSearch = async () => {
    const sensorType = sensor === 'any' ? undefined : sensor;
    const data = await getData(farmId, page, sensorType, byMonth, year, month);
    setData(data);

    if (sensorType) {
      const average = await getAverage(farmId, sensorType, byMonth, year, month);
      const { min, max } = await getMinMax(farmId, sensorType, byMonth, year, month);
      setAverage(average);
      setMin(min);
      setMax(max);
    }
  };

  useEffect(() => {
    const update = async () => {
      const sensorType = sensor === 'any' ? undefined : sensor;
      const records = await getNumOfRecords(farmId, sensorType, byMonth, year, month);
      setPages(Math.ceil(records / perPage));
      await handleSearch();
    };
    update().catch(() => setData([]));
  }, [sensor, farmId, year, month, page, byMonth]);

  const handleFarmChange = (e: SelectChangeEvent<number>) => {
    const id = e.target.value;
    setPage(1);
    setFarmId(Number(id));
  };

  const handleSensorChange = (e: ChangeEvent, val: string) => {
    setPage(1);
    setSensor(val);
  };

  const handlePageChange = (e: ChangeEvent, page: number) => {
    setPage(page);
  };

  const handleYearChange = (e: SelectChangeEvent<number>) => {
    const year = e.target.value;
    setPage(1);
    setYear(Number(year));
  };

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    const month = e.target.value;
    setPage(1);
    setMonth(Number(month));
  };

  const handleByMonth = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setPage(1);
    setByMonth(checked);
    await handleSearch();
  };

  return (
    <Container className="App" sx={{ marginBottom: 2 }}>
      <Typography sx={{ my: '1.5rem' }} variant="h3">Data master 4000</Typography>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <Grid container>
        <SensorSelection handleSensorChange={handleSensorChange} />
        <FormControlLabel control={<Switch onChange={handleByMonth} />} label="By month" />
        <AggregateData average={average} min={min} max={max} show={sensor !== 'any'} />
      </Grid>
      <MonthSelection
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
        year={year}
        month={month}
        show={byMonth}
      />
      <DataTable data={data} pages={pages} handlePageChange={handlePageChange} page={page} />
      <DataChart farmId={farmId} month={month} year={year} byMonth={byMonth} sensor={sensor} />
    </Container>
  );
};

export default App;
