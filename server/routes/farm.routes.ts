import { Application } from 'express';
import * as controller from '../controllers/farm.controller';

const farmRoutes = (app: Application) => {
  app.get('/farms', controller.getAllFarms);
  app.get('/farms/id/:id', controller.getFarmById);
  app.get('/farms/name/:name', controller.getFarmByName);
};

export default farmRoutes;
