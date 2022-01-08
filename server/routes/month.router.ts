import express from 'express';
import * as controller from '../controllers/farm.data.controller';

const monthRouter = express.Router({ mergeParams: true });

monthRouter.get('/', controller.getAllMonthlyData);
monthRouter.get('/sensor/:sensor', controller.getMonthlyData);
monthRouter.get('/sensor/:sensor/average', controller.getMonthlyAverage);
monthRouter.get('/sensor/:sensor/min-max', controller.getMonthlyMinMax);

export default monthRouter;
