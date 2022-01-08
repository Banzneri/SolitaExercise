import express from 'express';
import * as controller from '../controllers/farm.data.controller';

const dataRouter = express.Router({ mergeParams: true });

dataRouter.get('/', controller.getDataByFarmId);
dataRouter.get('/sensor/:sensor', controller.getDataByFarmIdAndSensor);
dataRouter.get('/sensor/:sensor/average', controller.getAllTimeAverage);
dataRouter.get('/sensor/:sensor/min-max', controller.getAllTimeMinMax);
dataRouter.get('/timespan/:startDate&:endDate/sensor/:sensor', controller.getSensorDataBetweenDates);

export default dataRouter;
