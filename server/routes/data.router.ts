import express from 'express';
import * as controller from '../controllers/farm.data.controller';

const dataRouter = express.Router({ mergeParams: true });

dataRouter.get(
  '/',
  controller.validate('getDataByFarmId'),
  controller.getDataByFarmId,
);
dataRouter.get(
  '/sensor/:sensor',
  controller.validate('getDataByFarmIdAndSensor'),
  controller.getDataByFarmIdAndSensor,
);
dataRouter.get(
  '/sensor/:sensor/average',
  controller.validate('getAllTimeAverage'),
  controller.getAllTimeAverage,
);
dataRouter.get(
  '/sensor/:sensor/min-max',
  controller.validate('getAllTimeMinMax'),
  controller.getAllTimeMinMax,
);
dataRouter.get(
  '/timespan/:startDate&:endDate/sensor/:sensor',
  controller.validate('getSensorDataBetweenDates'),
  controller.getSensorDataBetweenDates,
);

export default dataRouter;
