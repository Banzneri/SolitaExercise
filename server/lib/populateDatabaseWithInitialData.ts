import path from 'path';
import fs from 'fs';
import { CSVToArray } from './utils';
import { FarmDataObject } from '../types/FarmDataObject';
import db from './db';
import createDatabase from './createDatabase';

const initialDataPath = path.join(path.resolve(), '..', 'initial_data');

const getInitialData = async (
  files: string[],
) => new Promise<FarmDataObject[]>((resolve) => {
  const allFarms: FarmDataObject[][] = [];
  let times = 0;

  files.forEach(async (file) => {
    console.log(`converting ${file}...`);
    const url = path.join(initialDataPath, file);
    const farms = await CSVToArray(url);
    console.log(`converted ${file}`);

    if (!farms) throw new Error('No farms found');

    allFarms.push(farms);
    times += 1;

    if (times === files.length) {
      resolve(allFarms.flat());
    }
  });
});

fs.readdir(initialDataPath, async (error, files) => {
  if (error) throw error;

  await createDatabase();

  const farmDataObjects = await getInitialData(files);

  const query = `
    INSERT INTO farm_data (location, time, sensor_type, value)
    VALUES ($1, $2, $3, $4)`;

  farmDataObjects.forEach(async (farm) => {
    await db.query(query, [
      farm.location,
      farm.datetime,
      farm.sensorType,
      farm.value]);
  });
});
