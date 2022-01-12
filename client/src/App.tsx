import { ChangeEvent, useEffect, useState } from 'react';
import {
  Container,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FarmData } from './types/types';
import DataTable from './components/DataTable/DataTable';
import {
  getDataByFarmId,
  getDataByFarmIdAndSensor,
  getNumOfRecordsByFarmId,
  getNumOfRecordsByFarmIdAndSensor,
} from './services/DataService';
import FarmListContainer from './components/FarmListContainer/FarmListContainer';
import SensorSelection from './components/SensorSelection/SensorSelection';

const App = () => {
  const [data, setData] = useState<FarmData[]>([]);
  const [farmId, setFarmId] = useState<number>(1);
  const [sensor, setSensor] = useState<string>('any');
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const handleSearch = async (page: number) => {
    const data = sensor !== 'any'
      ? await getDataByFarmIdAndSensor(farmId, sensor, page)
      : await getDataByFarmId(farmId, page);
    setData(data);
  };

  useEffect(() => {
    const update = async () => {
      const records = sensor !== 'any'
        ? await getNumOfRecordsByFarmIdAndSensor(farmId, sensor)
        : await getNumOfRecordsByFarmId((farmId));
      setPages(Math.ceil(records / 15));
      await handleSearch(page);
    };
    update();
  }, [sensor, farmId, page]);

  const handleFarmChange = async (e: SelectChangeEvent) => {
    const id = e.target.value;
    setPage(1);
    setFarmId(Number(id));
  };

  const handleSensorChange = async (e: ChangeEvent, val: string) => {
    setPage(1);
    setSensor(val);
  };

  const handlePageChange = async (e: ChangeEvent, page: number) => {
    setPage(page);
  };

  return (
    <Container className="App">
      <Typography sx={{ my: '3rem' }} variant="h2">Farm data viewer</Typography>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <SensorSelection handleSensorChange={handleSensorChange} />
      <DataTable data={data} pages={pages} handlePageChange={handlePageChange} page={page} />
    </Container>
  );
};

export default App;
