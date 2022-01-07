import { Application } from 'express';
import * as controller from '../controllers/farm.data.controller';

const farmDataRoutes = (app: Application) => {
  app.get('/data', controller.getAllData);
  app.get('/data/farm/:id', controller.getDataByFarmId);
  app.get('/data/farm/:id/sensor/:sensor', controller.getDataByFarmIdAndSensor);
  app.get('/data/farm/:id/month/:year&:month', controller.getAllMonthlyData);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor', controller.getMonthlyData);
  app.get('/data/farm/:id/sensor/:sensor/average', controller.getAllTimeAverage);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor/average', controller.getMonthlyAverage);
  app.get('/data/farm/:id/sensor/:sensor/min-max', controller.getAllTimeMinMax);
  app.get('/data/farm/:id/month/:year&:month/sensor/:sensor/min-max', controller.getMonthlyMinMax);
  app.get('/data/farm/:id/timespan/:startDate&:endDate/sensor/:sensor', controller.getSensorDataBetweenDates);
};

export default farmDataRoutes;
