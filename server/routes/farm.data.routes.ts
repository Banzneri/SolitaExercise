import { Application } from 'express';
import * as controller from '../controllers/farm.data.controller';

const farmDataRoutes = (app: Application) => {
  app.get('/data', controller.getAllFarmData);
  app.get('/data/farm/:id', controller.getFarmDataByFarmId);
  app.get('/data/farm/:id/sensor/:sensor', controller.getFarmDataByFarmIdAndSensorType);
  app.get('/data/farm/:id/month/:year&:month', controller.getFarmDataByFarmIdAndMonthYear);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor/average', controller.getMonthlyAverageByFarmIdAndSensorType);
};

export default farmDataRoutes;
