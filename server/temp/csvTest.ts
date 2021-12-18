import path from 'path';
import { CSVToArray } from '../lib/utils';
import { HandleCSVParsingResults } from '../types/HandleCSVParsingResults';

const farmName = process.argv.splice(2)[0] || 'nooras_farm';

const dirname = path.resolve();
const filePath = path.join(dirname, '..', 'initial_data', `${farmName}.csv`);

const handleResult: HandleCSVParsingResults = (
  error,
  result,
) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(result);
};

CSVToArray(filePath, handleResult);
