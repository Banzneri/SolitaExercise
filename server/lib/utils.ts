import parseCSV from 'csv-parser';
import { Response } from 'express';
import fs from 'fs';
import FarmService from '../services/farm.service';
import { FarmData, RawData } from '../types/types';

export const validFarmDataObject = (farmData: FarmData) => {
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
): Promise<FarmData[]> => {
  const convertTypes = async (rawData: RawData) => {
    const data: FarmData = {} as FarmData;
    const farm = await FarmService.getFarmByName(rawData.location);
    data.farmId = farm[0].id;
    data.datetime = new Date(rawData.datetime);
    data.sensorType = rawData.sensorType.toLowerCase();
    data.value = Number(rawData.value);
    return data;
  };

  return new Promise<FarmData[]>((resolve, reject) => {
    const parser = parseCSV();
    const farms: FarmData[] = [];
    fs.createReadStream(filePath)
      .pipe(parser)
      .on('readable', async () => {
        let rawData: RawData;
        // eslint-disable-next-line no-cond-assign
        while ((rawData = parser.read()) !== null) {
          /* eslint-disable no-await-in-loop */
          const farm = await convertTypes(rawData);
          if (validFarmDataObject(farm)) {
            farms.push(farm);
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
};

export const respondResults = (res: Response, results: any) => (
  results.length === 0
    ? res.status(204).json({ message: 'No results found' })
    : res.status(200).json(results));

export const respondError = (
  res: Response,
  code: number,
  error: any,
) => res.status(code).json({ error });
