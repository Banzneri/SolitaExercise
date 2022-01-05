import { Request, Response } from 'express';
import { respondError, respondResults } from '../lib/utils';
import FarmDataService from '../services/farm.data.service';

export const getAllData = async (
  req: Request,
  res: Response,
) => {
  try {
    const results = await FarmDataService.getAllData();
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getDataByFarmId = async (
  req: Request,
  res: Response,
) => {
  try {
    const farmId = Number(req.params.farmId);
    const results = await FarmDataService.getDataByFarmId(farmId);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getDataByFarmIdAndSensor = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const { sensor } = req.params;
    const results = await FarmDataService.getDataByFarmIdAndSensor(id, sensor);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getMonthlyDataByFarmId = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const results = await FarmDataService.getMonthlyDataByFarmId(id, year, month);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getMonthlyAverageByFarmIdAndSensor = async (
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
