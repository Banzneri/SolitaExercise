import express from 'express';
import * as controller from '../controllers/data.controller';

const dataRouter = express.Router({ mergeParams: true });

dataRouter.get(
  '/',
  controller.validate('getDataByFarmId'),
  controller.getDataByFarmId,
);
dataRouter.get(
  '/average',
  controller.validate('getAllTimeAverage'),
  controller.getAllTimeAverage,
);
dataRouter.get(
  '/min-max',
  controller.validate('getAllTimeMinMax'),
  controller.getAllTimeMinMax,
);
dataRouter.get(
  '/timespan/:startDate&:endDate',
  controller.validate('getSensorDataBetweenDates'),
  controller.getSensorDataBetweenDates,
);
dataRouter.get(
  '/total',
  controller.validate('getNumOfRecords'),
  controller.getNumOfRecords,
);

export default dataRouter;
