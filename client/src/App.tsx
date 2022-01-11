import React, { useEffect, useState } from 'react';
import { FarmData } from './types/types';
import DataTable from './components/data-table/DataTable';
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
    <div className="App">
      <DataTable data={data} />
    </div>
  );
};

export default App;
