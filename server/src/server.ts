import express from 'express';
import dataRouter from './routes/data.router';
import monthRouter from './routes/month.router';

const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dataRouter.use('/month/:year&:month', monthRouter);
app.use('/data/farm/:id', dataRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
