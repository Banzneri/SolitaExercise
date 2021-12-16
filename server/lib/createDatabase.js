import pgtools from 'pgtools';

const databaseName = 'farms';

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'Jaakkola12',
  port: 5432,
};

pgtools.createdb(config, databaseName, (err, res) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
