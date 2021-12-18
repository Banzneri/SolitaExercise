import parse from 'csv-parser';
import fs from 'fs';
import { FarmDataObject } from '../types/FarmDataObject';
import { HandleCSVParsingResults } from '../types/HandleCSVParsingResults';

export const validFarmDataObject = (farmData: FarmDataObject) => {
  const validTemperature = (temperature: number) => temperature >= -50 && temperature <= 100;
  const validRainfall = (rainFall: number) => rainFall >= 0 && rainFall <= 500;
  const validPh = (ph: number) => ph >= 0 && ph <= 14;

  const { sensorType, value } = farmData;

  switch (sensorType.toLowerCase()) {
    case 'temperature': return validTemperature(value);
    case 'rainfall': return validRainfall(value);
    case 'ph': return validPh(value);
    default:
      return false;
  }
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
