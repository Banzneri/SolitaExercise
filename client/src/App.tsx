import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { FarmData } from './types/types';
import DataTable from './components/DataTable/DataTable';
import { getDataByFarmIdAndSensor } from './services/DataService';

const App = () => {
  const [data, setData] = useState<FarmData[]>([]);

  useEffect(() => {
    const update = async () => {
      const response = await getDataByFarmIdAndSensor(1, 'ph');
      setData(response);
    };
    update();
  }, []);

  return (
    <Container className="App">
      <DataTable data={data} />
    </Container>
  );
};

export default App;
