import express from 'express';
import * as controller from '../controllers/data.controller';

const monthRouter = express.Router({ mergeParams: true });

monthRouter.get(
  '/',
  controller.validate('getAllMonthlyData'),
  controller.getAllMonthlyData,
);
monthRouter.get(
  '/sensor/:sensor',
  controller.validate('getMonthlyData'),
  controller.getMonthlyData,
);
monthRouter.get(
  '/sensor/:sensor/average',
  controller.validate('getMonthlyAverage'),
  controller.getMonthlyAverage,
);
monthRouter.get(
  '/sensor/:sensor/min-max',
  controller.validate('getMonthlyMinMax'),
  controller.getMonthlyMinMax,
);

export default monthRouter;
