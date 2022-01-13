import express from 'express';
import * as controller from '../controllers/data.controller';

const monthRouter = express.Router({ mergeParams: true });

monthRouter.get(
  '/',
  controller.validate('getMonthlyData'),
  controller.getMonthlyData,
);
monthRouter.get(
  '/average',
  controller.validate('getMonthlyAverage'),
  controller.getMonthlyAverage,
);
monthRouter.get(
  '/min-max',
  controller.validate('getMonthlyMinMax'),
  controller.getMonthlyMinMax,
);
monthRouter.get(
  '/total',
  controller.validate('getMonthlyNumOfRecords'),
  controller.getMonthlyNumOfRecords,
);

export default monthRouter;
