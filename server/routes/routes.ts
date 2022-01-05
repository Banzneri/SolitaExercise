import { Application } from 'express';
import farmRoutes from './farm.routes';
import farmDataRoutes from './farm.data.routes';

const routes = (app: Application) => {
  farmRoutes(app);
  farmDataRoutes(app);
};

export default routes;
