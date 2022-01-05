import { Application } from 'express';
import * as controller from '../controllers/FarmDataController';

const farmDataRoutes = (app: Application) => {
  app.get('/farmData', controller.getAllFarmData);
  app.get('/farmData/farmId/:farmId', controller.getFarmDataByFarmId);
  app.get('/farmData/farmId/:farmId/sensorType/:sensorType', controller.getFarmDataByFarmIdAndSensorType);
  app.get('/farmData/farmId/:farmId/year/:year/month/:month', controller.getFarmDataByFarmIdAndMonthYear);
};

export default farmDataRoutes;
