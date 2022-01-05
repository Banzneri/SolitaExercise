import { Application } from 'express';
import * as farmDataController from '../controllers/FarmDataController';

const farmDataRoutes = (app: Application) => {
  app.get('/farmData', farmDataController.getAllFarmData);
  app.get('/farmData/farmId/:farmId', farmDataController.getFarmDataByFarmId);
};

export default farmDataRoutes;
