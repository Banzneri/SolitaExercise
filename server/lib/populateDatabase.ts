import path from 'path';
import fs from 'fs';
import cliProgress from 'cli-progress';
import { CSVToArray } from './utils';
import { FarmDataObject } from '../types/FarmDataObject';
import db from './db';
import createDatabase from './createDatabase';

const initialDataPath = path.join(path.resolve(), 'initial_data');

const getData = async (
  files: string[],
): Promise<FarmDataObject[]> => {
  const allFarms: FarmDataObject[][] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const file of files) {
    const url = path.join(initialDataPath, file);
    const farms = await CSVToArray(url);

    if (!farms) throw new Error('No farms found');

    allFarms.push(farms);
  }

  return allFarms.flat();
};

fs.readdir(initialDataPath, async (error, files) => {
  if (error) throw error;

  await createDatabase();

  const farmDataObjects = await getData(files);

  const query = `
    INSERT INTO farm_data (location, time, sensor_type, value)
    VALUES ($1, $2, $3, $4)`;

  console.log('Populating database...\n');
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(farmDataObjects.length, 0);

  let recordsAdded = 0;

  // eslint-disable-next-line no-restricted-syntax
  for await (const farm of farmDataObjects) {
    recordsAdded += 1;
    bar.update(recordsAdded);

    await db.query(query, [
      farm.location,
      farm.datetime,
      farm.sensorType,
      farm.value]);
  }
  bar.stop();
  console.log('\nFinishing...');
});
