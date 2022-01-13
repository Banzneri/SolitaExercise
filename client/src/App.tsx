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
  getDataByFarmIdAndSensor,
  getMonthlyData,
  getMonthlyNumOfRecordsByFarmId,
  getMonthlyNumOfRecordsByFarmIdAndSensor,
  getMonthlySensorData,
  getNumOfRecordsByFarmId,
  getNumOfRecordsByFarmIdAndSensor,
} from './services/DataService';
import FarmListContainer from './components/FarmListContainer/FarmListContainer';
import SensorSelection from './components/SensorSelection/SensorSelection';
import MonthSelection from './components/MonthSelection/MonthSelection';

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
    if (!byMonth) {
      const data = sensor !== 'any'
        ? await getDataByFarmIdAndSensor(farmId, sensor, page)
        : await getDataByFarmId(farmId, page);
      setData(data);
    } else {
      const data = sensor !== 'any'
        ? await getMonthlySensorData(farmId, year, month, sensor, page)
        : await getMonthlyData(farmId, year, month, page);
      setData(data);
    }
  };

  useEffect(() => {
    const update = async () => {
      if (!byMonth) {
        const records = sensor !== 'any'
          ? await getNumOfRecordsByFarmIdAndSensor(farmId, sensor)
          : await getNumOfRecordsByFarmId(farmId);
        setPages(Math.ceil(records / 15));
      } else {
        const records = sensor !== 'any'
          ? await getMonthlyNumOfRecordsByFarmIdAndSensor(farmId, year, month, sensor)
          : await getMonthlyNumOfRecordsByFarmId(farmId, year, month);
        setPages(Math.ceil(records / 15));
      }
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
    <Container className="App">
      <Typography sx={{ my: '3rem' }} variant="h2">Farm data viewer</Typography>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <Grid container>
        <SensorSelection handleSensorChange={handleSensorChange} />
        <FormControlLabel control={<Switch onChange={handleByMonth} />} label="By month" />
      </Grid>
      {byMonth
        && (
          <MonthSelection
            handleYearChange={handleYearChange}
            handleMonthChange={handleMonthChange}
          />
          )}
      <DataTable data={data} pages={pages} handlePageChange={handlePageChange} page={page} />
    </Container>
  );
};

export default App;
