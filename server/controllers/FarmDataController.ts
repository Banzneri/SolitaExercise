import { Request, Response } from 'express';
import { respondError, respondResults } from '../lib/utils';
import FarmDataService from '../services/FarmDataService';

export const getAllFarmData = async (
  req: Request,
  res: Response,
) => {
  try {
    const results = await FarmDataService.getAllFarmData();
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getFarmDataByFarmId = async (
  req: Request,
  res: Response,
) => {
  try {
    const farmId = Number(req.params.farmId);
    const results = await FarmDataService.getFarmDataByFarmId(farmId);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getFarmDataByFarmIdAndSensorType = async (
  req: Request,
  res: Response,
) => {
  try {
    const farmId = Number(req.params.farmId);
    const { sensorType } = req.params;
    const results = await FarmDataService.getFarmDataByFarmIdAndSensorType(farmId, sensorType);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};
