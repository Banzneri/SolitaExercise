import express from 'express';
import routes from './routes/routes';

const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
