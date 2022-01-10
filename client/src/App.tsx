import axios from 'axios';
import { FarmData } from '../../server/src/types/types';
import DataTable from './components/DataTable';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<FarmData[]>([]);

  useEffect(() => {
    const update = async () => {
      await getData();
    };
    update();
    console.log('effect');
  }, [])

  const getData = async () => {
    const response = await axios.get('http://localhost:3001/data/farm/1/sensor/ph');
    setData(response.data);
  };

  return (
    <div className="App">
      <DataTable data={data} />
    </div>
  );
};

export default App;
