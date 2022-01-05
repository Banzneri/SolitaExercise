import { Application } from 'express';
import * as farmController from '../controllers/FarmController';

const farmRoutes = (app: Application) => {
  app.get('/farms', farmController.getAllFarms);
  app.get('/farms/id/:id', farmController.getFarmById);
  app.get('/farms/name/:name', farmController.getFarmByName);
};

export default farmRoutes;
