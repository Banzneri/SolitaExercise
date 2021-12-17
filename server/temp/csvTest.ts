import path from 'path';
import CSVToArray from '../lib/CSVToArray';
import { FarmDataObject } from '../types/FarmDataObject';

const farmName = process.argv.splice(2)[0] || 'nooras_farm';

const dirname = path.resolve();
const filePath = path.join(dirname, '..', 'initial_data', `${farmName}.csv`);

const handleResult = (
  error: Error | null,
  result?: Array<FarmDataObject>,
) => {
  if (error) {
    console.log(error.message);
  }
  console.log(result);
};

CSVToArray(filePath, handleResult);
