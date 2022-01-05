import express, { Application } from 'express';

const app: Application = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
