import { Application } from 'express';
import farmRoutes from './farmRoutes';
import farmDataRoutes from './farmDataRoutes';

const routes = (app: Application) => {
  farmRoutes(app);
  farmDataRoutes(app);
};

export default routes;
