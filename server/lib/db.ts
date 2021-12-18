import pg from 'pg';

const { Pool } = pg;

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farms',
  password: 'Jaakkola12',
  port: 5432,
});

export default db;
