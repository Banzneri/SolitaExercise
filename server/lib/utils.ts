import parse from 'csv-parser';
import fs from 'fs';
import { FarmDataObject } from '../types/FarmDataObject';

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

export const CSVToArray = async (
  filePath: string,
) => {
  const convertTypes = (farmDataObject: FarmDataObject) => {
    const farm = farmDataObject;
    farm.datetime = new Date(farm.datetime);
    farm.value = Number(farm.value);
    return farm;
  };

  const getData = new Promise<FarmDataObject[]>((resolve, reject) => {
    const parser = parse();
    const farms: FarmDataObject[] = [];
    fs.createReadStream(filePath)
      .pipe(parser)
      .on('readable', () => {
        let farm: FarmDataObject;
        // eslint-disable-next-line no-cond-assign
        while ((farm = parser.read()) !== null) {
          if (validFarmDataObject(farm)) {
            farms.push(convertTypes(farm));
          }
        }
      })
      .on('end', () => {
        resolve(farms);
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  return getData;
};
