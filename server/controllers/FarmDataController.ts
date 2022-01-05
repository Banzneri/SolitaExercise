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

export const getFarmDataByFarmIdAndMonthYear = async (
  req: Request,
  res: Response,
) => {
  try {
    const farmId = Number(req.params.farmId);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const results = await FarmDataService.getFarmDataByFarmIdAndMonthYear(farmId, year, month);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getMonthlyAverageByFarmIdAndSensorType = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const { sensor } = req.params;

    const result = await FarmDataService
      .getMonthlyAverageByFarmIdAndSensor(id, year, month, sensor);
    return respondResults(res, result);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};
