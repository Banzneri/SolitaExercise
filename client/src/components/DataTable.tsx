import { FarmData } from '../../../server/src/types/types';
import { v4 as uuidv4 } from 'uuid';

interface DataTableProps {
  data: FarmData[]
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div>
      <table>
      <tr>
        <th>FarmId</th>
        <th>Time</th>
        <th>Sensor</th>
        <th>Value</th>
      </tr>
      {data.map((e) => 
        <tr key={uuidv4()}>
          <td>{e.farmId}</td>
          <td>{new Date(e.dateTime).toDateString()}</td>
          <td>{e.sensorType}</td>
          <td>{e.value}</td>
        </tr>)}
      </table>
    </div>
  );
};

export default DataTable;
