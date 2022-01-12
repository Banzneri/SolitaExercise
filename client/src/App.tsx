import { ChangeEvent, useState } from 'react';
import {
  Button,
  Container,
  SelectChangeEvent,
} from '@mui/material';
import { FarmData } from './types/types';
import DataTable from './components/DataTable/DataTable';
import { getDataByFarmId, getDataByFarmIdAndSensor } from './services/DataService';
import FarmListContainer from './components/FarmListContainer/FarmListContainer';
import SensorSelection from './components/SensorSelection/SensorSelection';

const App = () => {
  const [data, setData] = useState<FarmData[]>([]);
  const [farmId, setFarmId] = useState(1);
  const [sensor, setSensor] = useState({} as string);

  const handleFarmChange = async (e: SelectChangeEvent) => {
    const id = Number(e.target.value);

    if (Number.isNaN(id)) return;

    setFarmId(id);
  };

  const handleSensorChange = async (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    const sensor = element.value;
    setSensor(sensor);
  };

  const handleSearch = async () => {
    const data = sensor !== 'any'
      ? await getDataByFarmIdAndSensor(farmId, sensor)
      : await getDataByFarmId(farmId);
    setData(data);
  };

  return (
    <Container className="App">
      <h1>Farms</h1>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <SensorSelection handleSensorChange={handleSensorChange} />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      <DataTable data={data} />
    </Container>
  );
};

export default App;
