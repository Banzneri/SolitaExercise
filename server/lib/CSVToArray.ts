import fs from 'fs';
import parse from 'csv-parser';
import { FarmDataObject } from '../types/FarmDataObject';
import { HandleCSVParsingResults } from '../types/HandleCSVParsingResults';

const CSVToArray = (
  filePath: string,
  handleResult: HandleCSVParsingResults,
) => {
  const records: Array<FarmDataObject> = [];

  const parser = parse();

  fs.createReadStream(filePath)
    .pipe(parser)
    .on('readable', () => {
      let record: FarmDataObject;
      // eslint-disable-next-line no-cond-assign
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    })
    .on('end', () => {
      handleResult(null, records);
    })
    .on('error', (err) => {
      handleResult(err);
    });
};

export default CSVToArray;
