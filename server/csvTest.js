import path from 'path';
import CSVToArray from './lib/CSVToArray';

const dirname = path.resolve();

const farmName = process.argv.splice(2)[0] || 'nooras_farm';

const filePath = path.join(dirname, 'initial_data', `${farmName}.csv`);

const handleResult = (error, result) => {
  if (error) {
    console.log(error.message);
  }
  console.log(result);
};

CSVToArray(filePath, handleResult);
