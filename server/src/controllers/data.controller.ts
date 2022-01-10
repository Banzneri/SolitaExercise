import { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { respondError, respondResults } from '../lib/utils';
import DataService from '../services/data.service';

const handleRequest = async (
  req: Request,
  res: Response,
  handle: Function,
  params: Array<any>,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    const results = await handle(...params);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error);
  }
};

export const getAllData = async (
  req: Request,
  res: Response,
) => {
  await handleRequest(
    req,
    res,
    DataService.getAllData,
    [],
  );
};

export const getDataByFarmId = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  await handleRequest(
    req,
    res,
    DataService.getDataByFarmId,
    [id],
  );
};

export const getDataByFarmIdAndSensor = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getDataByFarmIdAndSensor,
    [id, sensor],
  );
};

export const getAllMonthlyData = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const year = Number(req.params.year);
  const month = Number(req.params.month);

  await handleRequest(
    req,
    res,
    DataService.getAllMonthlyData,
    [id, year, month],
  );
};

export const getMonthlyData = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const { sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getMonthlyData,
    [id, year, month, sensor],
  );
};

export const getAllTimeAverage = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getAllTimeAverage,
    [id, sensor],
  );
};

export const getMonthlyAverage = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const { sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getMonthlyAverage,
    [id, year, month, sensor],
  );
};

export const getAllTimeMinMax = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getAllTimeMinMax,
    [id, sensor],
  );
};

export const getMonthlyMinMax = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const { sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getMonthlyMinMax,
    [id, year, month, sensor],
  );
};

export const getSensorDataBetweenDates = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { startDate, endDate, sensor } = req.params;

  await handleRequest(
    req,
    res,
    DataService.getSensorDataBetweenDates,
    [id, startDate, endDate, sensor],
  );
};

export const validate = (method: string) => {
  const validId = () => param('id', 'id must be an integer')
    .isInt();

  const validSensor = () => param('sensor', 'wrong sensor type')
    .isIn(['ph', 'rainfall', 'temperature'])
    .toLowerCase();

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
