import parse from 'csv-parser';
import fs from 'fs';
import { FarmDataObject } from '../types/FarmDataObject';
import { HandleCSVParsingResults } from '../types/HandleCSVParsingResults';

export const validFarmDataObject = (farmData: FarmDataObject) => {
  const validTemperature = (temp: number) => temp >= -50 && temp <= 100;
  const validRainfall = (rain: number) => rain >= 0 && rain <= 500;
  const validPh = (ph: number) => ph >= 0 && ph <= 14;

  const { sensorType, value } = farmData;

  switch (sensorType.toLowerCase()) {
    case 'temperature': return validTemperature(value);
    case 'rainfall': return validRainfall(value);
    case 'ph': return validPh(value);
    default: return false;
  }
};

export const CSVToArray = (
  filePath: string,
  handleResult: HandleCSVParsingResults,
) => {
  const convertTypes = (farmDataObject: FarmDataObject) => {
    const farm = farmDataObject;
    farm.datetime = new Date(farm.datetime);
    farm.value = Number(farm.value);
    return farm;
  };

  const farmObjects: FarmDataObject[] = [];
  const invalidObjects: FarmDataObject[] = [];

  const parser = parse();

  fs.createReadStream(filePath)
    .pipe(parser)
    .on('readable', () => {
      let farm: FarmDataObject;
      // eslint-disable-next-line no-cond-assign
      while ((farm = parser.read()) !== null) {
        if (validFarmDataObject(farm)) {
          farmObjects.push(convertTypes(farm));
        } else {
          invalidObjects.push(convertTypes(farm));
        }
      }
    })
    .on('end', () => {
      handleResult(null, invalidObjects.length > 0 ? invalidObjects : farmObjects);
    })
    .on('error', (err) => {
      handleResult(err);
    });
};
