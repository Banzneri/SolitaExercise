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

  useEffect(() => {
    const update = async () => {
      const records = sensor !== 'any'
        ? await getNumOfRecordsByFarmIdAndSensor(farmId, sensor)
        : await getNumOfRecordsByFarmId((farmId));
      setPages(Math.floor(records / 15));
    };
    update();
  }, [sensor, farmId]);

  const handleSearch = async (page: number) => {
    const data = sensor !== 'any'
      ? await getDataByFarmIdAndSensor(farmId, sensor, page)
      : await getDataByFarmId(farmId);
    setData(data);
  };

  const handleFarmChange = async (e: SelectChangeEvent) => {
    const id = Number(e.target.value);
    setPage(1);
    setFarmId(id);
    await handleSearch(page);
  };

  const handleSensorChange = async (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    const sensor = element.value;
    setPage(1);
    setSensor(sensor);
    await handleSearch(page);
  };

  const handlePageChange = async (e: ChangeEvent, page: number) => {
    setPage(page);
    await handleSearch(page);
  };

  const headerStyle = {
    paddingBottom: '0.5em',
  };

  return (
    <Container className="App">
      <Typography sx={headerStyle} variant="h2">Farms</Typography>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <SensorSelection handleSensorChange={handleSensorChange} />
      <DataTable data={data} pages={pages} handlePageChange={handlePageChange} />
    </Container>
  );
};

export default App;
