import dotenv from 'dotenv';
import { Client } from 'pg';
import db from './db';

dotenv.config();

const databaseName = process.env.DB_DATABASE;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: +(process.env.DB_PORT || ''),
});

const createDatabase = async () => {
  console.log(`Creating a database ${databaseName}...`);
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
    console.log(`Created a database ${databaseName}`);
  }
};

export default createDatabase;
