import { Application } from 'express';
import * as controller from '../controllers/farm.data.controller';

const farmDataRoutes = (app: Application) => {
  app.get('/data', controller.getAllData);
  app.get('/data/farm/:id', controller.getDataByFarmId);
  app.get('/data/farm/:id/sensor/:sensor', controller.getDataByFarmIdAndSensor);
  app.get('/data/farm/:id/month/:year&:month', controller.getMonthlyDataByFarmId);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor', controller.getMonthlyDataByFarmIdAndSensor);
  app.get('/data/farm/:id/sensor/:sensor/average', controller.getAllTimeAverageByFarmIdAndSensor);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor/average', controller.getMonthlyAverageByFarmIdAndSensor);
  app.get('/data/farm/:id/sensor/:sensor/min-max', controller.getAllTimeMinMaxByFarmIdAndSensor);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor/min-max', controller.getMonthlyMinMaxByFarmIdAndSensor);
};

export default farmDataRoutes;
