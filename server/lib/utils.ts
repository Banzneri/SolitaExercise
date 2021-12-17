import parse from 'csv-parser';
import fs from 'fs';
import { FarmDataObject } from '../types/FarmDataObject';
import { HandleCSVParsingResults } from '../types/HandleCSVParsingResults';

export const validFarmDataObject = (farmData: FarmDataObject) => {
  const data = farmData;
  return data;
};

export const CSVToArray = (
  filePath: string,
  handleResult: HandleCSVParsingResults,
) => {
  const records: FarmDataObject[] = [];

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
