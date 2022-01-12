import { ChangeEvent, useState } from 'react';
import {
  Button,
  Container, Grid,
  SelectChangeEvent, Typography,
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

  const headerStyle = {
    paddingBottom: '0.5em',
  };

  const gridStyle = {
    margin: '1em',
  };

  const buttonStyle = {
    margin: '1em',
  };

  return (
    <Container className="App">
      <Typography sx={headerStyle} variant="h2">Farms</Typography>
      <FarmListContainer handleFarmChange={handleFarmChange} />
      <Grid sx={gridStyle} container>
        <SensorSelection handleSensorChange={handleSensorChange} />
        <Button sx={buttonStyle} variant="contained" onClick={handleSearch}>Search</Button>
      </Grid>
      <DataTable data={data} />
    </Container>
  );
};

export default App;
