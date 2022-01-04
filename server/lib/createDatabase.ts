import dotenv from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
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
    await client.connect();
    await client.query(`CREATE DATABASE ${databaseName}`);
    console.log('here');
    const filePath = path.join(__dirname, 'init_database.sql');
    const initQuery = await fs.promises.readFile(filePath);
    console.log(initQuery.toString());
    await db.query(initQuery.toString());
    await client.end();
    return console.log(`Created a database ${databaseName}`);
  } catch (error) {
    return console.error(error.stack);
  }
};

export default createDatabase;
