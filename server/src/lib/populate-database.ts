import path from 'path';
import fs from 'fs';
import progressBar from 'cli-progress';
import { CSVToArray } from './utils';
import db from './db';
import createDatabase from './create-database';
import { FarmData } from '../types/types';

const initialDataPath = path.join(__dirname, '..', 'initial-data');

const getData = async (
  files: string[],
): Promise<FarmData[]> => {
  const allFarms: FarmData[][] = [];

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
  const createProgressBar = () => new progressBar.SingleBar(
    {},
    progressBar.Presets.shades_classic,
  );

  if (error) throw error;

  await createDatabase();

  const farmDataObjects = await getData(files);

  console.log('Populating database...\n');
  const bar = createProgressBar();
  bar.start(farmDataObjects.length, 0);

  let recordsAdded = 0;
  const query = `
    INSERT INTO farm_data (farm_id, time, sensor_type, value)
    VALUES ($1, $2, $3, $4)`;

  // eslint-disable-next-line no-restricted-syntax
  for await (const farm of farmDataObjects) {
    recordsAdded += 1;
    bar.update(recordsAdded);

    await db.query(query, [
      farm.farmId,
      farm.dateTime,
      farm.sensorType,
      farm.value]);
  }
  bar.stop();
  return console.log('\nFinishing...');
});
