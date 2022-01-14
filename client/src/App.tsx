import { ChangeEvent, useEffect, useState } from 'react';
import {
  Container, FormControlLabel, Grid,
  SelectChangeEvent, Switch,
  Typography,
} from '@mui/material';
import { FarmData } from './types/types';
import DataTable from './components/DataTable/DataTable';
import {
  getDataByFarmId,
  getMonthlyData,
  getMonthlyNumOfRecordsByFarmId,
  getNumOfRecordsByFarmId,
} from './services/DataService';
import FarmListContainer from './components/FarmListContainer/FarmListContainer';
import SensorSelection from './components/SensorSelection/SensorSelection';
import MonthSelection from './components/MonthSelection/MonthSelection';

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

  const handleSearch = async (page: number) => {
    const sensorType = sensor === 'any' ? undefined : sensor;
    const data = byMonth
      ? await getMonthlyData(farmId, year, month, page, sensorType)
      : await getDataByFarmId(farmId, page, sensorType);
    setData(data);
  };

  useEffect(() => {
    const update = async () => {
      const sensorType = sensor === 'any' ? undefined : sensor;
      const records = byMonth
        ? await getMonthlyNumOfRecordsByFarmId(farmId, year, month, sensorType)
        : await getNumOfRecordsByFarmId(farmId, sensorType);
      setPages(Math.ceil(records / perPage));
      await handleSearch(page);
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

  const handleByMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setPage(1);
    setByMonth(checked);
  };

  return (
    <Container className="App" sx={{ marginBottom: 2 }}>
      <Typography sx={{ my: '1.5rem' }} variant="h3">Farm data viewer</Typography>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <Grid container>
        <SensorSelection handleSensorChange={handleSensorChange} />
        <FormControlLabel control={<Switch onChange={handleByMonth} />} label="By month" />
      </Grid>
      <MonthSelection
        handleYearChange={handleYearChange}
        handleMonthChange={handleMonthChange}
        show={byMonth}
      />
      <DataTable data={data} pages={pages} handlePageChange={handlePageChange} page={page} />
    </Container>
  );
};

export default App;
