import { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { respondError, respondResults } from '../lib/utils';
import FarmDataService from '../services/farm.data.service';

const checkInput = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw Error('Invalid input');
  }
};

export const getAllData = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const results = await FarmDataService.getAllData();
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error);
  }
};

export const getDataByFarmId = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const results = await FarmDataService.getDataByFarmId(id);
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
    checkInput(req);
    const id = Number(req.params.id);
    const { sensor } = req.params;
    const results = await FarmDataService.getDataByFarmIdAndSensor(id, sensor);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getAllMonthlyData = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const results = await FarmDataService.getAllMonthlyData(id, year, month);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getMonthlyData = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const { sensor } = req.params;
    const results = await FarmDataService.getMonthlyData(id, year, month, sensor);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getAllTimeAverage = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const { sensor } = req.params;
    const result = await FarmDataService.getAllTimeAverage(id, sensor);
    return respondResults(res, result);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getMonthlyAverage = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const { sensor } = req.params;
    const result = await FarmDataService.getMonthlyAverage(id, year, month, sensor);
    return respondResults(res, result);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getAllTimeMinMax = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const { sensor } = req.params;
    const result = await FarmDataService.getAllTimeMinMax(id, sensor);
    return respondResults(res, result);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getMonthlyMinMax = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const { sensor } = req.params;
    const result = await FarmDataService.getMonthlyMinMax(id, year, month, sensor);
    return respondResults(res, result);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getSensorDataBetweenDates = async (
  req: Request,
  res: Response,
) => {
  try {
    checkInput(req);
    const id = Number(req.params.id);
    const { startDate, endDate, sensor } = req.params;
    const results = await FarmDataService
      .getSensorDataBetweenDates(id, new Date(startDate), new Date(endDate), sensor);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const validate = (method: string) => {
  const validId = () => param('id', 'id must be an integer')
    .isInt();
  const validSensor = () => param('sensor', 'wrong sensor type')
    .isIn(['ph', 'rainfall', 'temperature']);
  const validYear = () => param('year', 'invalid year')
    .isInt({ min: 1900, max: 2050 });
  const validMonth = () => param('month', 'invalid month')
    .isInt({ min: 1, max: 12 });
  const validDate = (date: string) => param(date, `invalid ${date}`)
    .isDate();

  switch (method) {
    case 'getDataByFarmId':
      return [
        validId(),
      ];
    case 'getDataByFarmIdAndSensor':
      return [
        validId(),
        validSensor(),
      ];
    case 'getAllMonthlyData':
      return [
        validId(),
        validYear(),
        validMonth(),
      ];
    case 'getMonthlyData':
      return [
        validId(),
        validYear(),
        validMonth(),
        validSensor(),
      ];
    case 'getAllTimeAverage':
      return [
        validId(),
        validSensor(),
      ];
    case 'getMonthlyAverage':
      return [
        validId(),
        validYear(),
        validMonth(),
        validSensor(),
      ];
    case 'getAllTimeMinMax':
      return [
        validId(),
        validSensor(),
      ];
    case 'getMonthlyMinMax':
      return [
        validId(),
        validYear(),
        validMonth(),
        validSensor(),
      ];
    case 'getSensorDataBetweenDates':
      return [
        validId(),
        validDate('startDate'),
        validDate('endDate'),
        validSensor(),
      ];
    default: return [];
  }
};
