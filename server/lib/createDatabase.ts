import { Client } from 'pg';
import db from './db';

const databaseName = 'farm_database';

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Jaakkola12',
  port: 5432,
});

console.log('1111');

const createDatabase = async () => {
  try {
    await client.connect(); // gets connection
    await client.query(`CREATE DATABASE ${databaseName}`); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await client.end(); // closes connection

    const query = `
      CREATE TABLE "farm_data" (
        "id" SERIAL PRIMARY KEY,
        "location" varchar NOT NULL,
        "time" timestamp NOT NULL,
        "sensor_type" varchar NOT NULL,
        "value" decimal NOT NULL
      );`;

    const query1 = `
      CREATE TABLE "farms" (
        "id" SERIAL PRIMARY KEY,
        "name" varchar NOT NULL,
        "location" varchar NOT NULL
      );
    `;

    await db.query(query);
    await db.query(query1);
  }
};

export default createDatabase;
