import express from 'express';
import cors from 'cors';
import dataRouter from './routes/data.router';
import monthRouter from './routes/month.router';
import farmRouter from './routes/farm.routes';

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/farms', farmRouter);
dataRouter.use('/month/:year&:month', monthRouter);
app.use('/data/farm/:id', dataRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}.`);
});
