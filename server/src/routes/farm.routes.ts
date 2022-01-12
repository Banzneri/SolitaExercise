import express from 'express';
import * as controller from '../controllers/farm.controller';

const farmRouter = express.Router({ mergeParams: true });

farmRouter.get('/', controller.getAllFarms);
farmRouter.get('/id/:id', controller.getFarmById);
farmRouter.get('/name/:name', controller.getFarmByName);

export default farmRouter;
