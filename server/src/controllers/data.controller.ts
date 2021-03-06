import { Request, Response } from 'express';
import { param, query, validationResult } from 'express-validator';
import { respondError, respondResults } from '../lib/utils';
import DataService from '../services/data.service';

const handleRequest = async (
  req: Request,
  res: Response,
  handle: Function,
  params: Array<any>,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return respondError(res, 400, errors);
  }
  try {
    const { page } = req.query;
    const results = await handle(...params, page);
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
  const { sensor } = req.query;

  const serviceFunction = sensor
    ? DataService.getDataByFarmIdAndSensor
    : DataService.getDataByFarmId;
  const params = sensor ? [id, sensor] : [id];

  await handleRequest(
    req,
    res,
    serviceFunction,
    params,
  );
};

export const getMonthlyData = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const { sensor } = req.query;

  const serviceFunction = sensor
    ? DataService.getMonthlyData
    : DataService.getAllMonthlyData;
  const params = sensor
    ? [id, year, month, sensor]
    : [id, year, month];

  await handleRequest(
    req,
    res,
    serviceFunction,
    params,
  );
};

export const getAllTimeAverage = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { sensor } = req.query;

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
  const { sensor } = req.query;

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
  const { sensor } = req.query;

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
  const { sensor } = req.query;

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
  const { startDate, endDate } = req.params;
  const { sensor } = req.query;

  await handleRequest(
    req,
    res,
    DataService.getSensorDataBetweenDates,
    [id, startDate, endDate, sensor],
  );
};

export const getNumOfRecords = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { sensor } = req.query;

  const serviceFunction = sensor
    ? DataService.getNumOfRecordsByFarmIdAndSensor
    : DataService.getNumOfRecordsByFarmId;
  const params = sensor ? [id, sensor] : [id];

  await handleRequest(
    req,
    res,
    serviceFunction,
    params,
  );
};

export const getMonthlyNumOfRecords = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const { sensor } = req.query;

  const serviceFunction = sensor
    ? DataService.getMonthlyNumOfRecordsByFarmIdAndSensor
    : DataService.getMonthlyNumOfRecordsByFarmId;
  const params = sensor
    ? [id, year, month, sensor]
    : [id, year, month];

  await handleRequest(
    req,
    res,
    serviceFunction,
    params,
  );
};

export const validate = (method: string) => {
  const validId = () => param('id', 'id must be an integer')
    .isInt();

  const validSensor = () => query('sensor', 'wrong sensor type')
    .toLowerCase()
    .isIn(['ph', 'rainfall', 'temperature']);

  const validYear = () => param('year', 'invalid year')
    .isInt({ min: 1900, max: 2050 });

  const validMonth = () => param('month', 'invalid month')
    .isInt({ min: 1, max: 12 });

  const validDate = (date: string) => param(date, `invalid ${date}`)
    .isDate();

  const optionalValidSensor = () => query('sensor', 'wrong sensor type')
    .toLowerCase()
    .optional({ nullable: true, checkFalsy: true })
    .isIn(['ph', 'rainfall', 'temperature']);
  const optionalValidPage = () => query('page', 'invalid page query')
    .optional({ nullable: true, checkFalsy: true })
    .isInt();

  switch (method) {
    case 'getDataByFarmId':
      return [
        validId(),
        optionalValidSensor(),
        optionalValidPage(),
      ];
    case 'getMonthlyData':
      return [
        validId(),
        validYear(),
        validMonth(),
        optionalValidSensor(),
        optionalValidPage(),
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
    case 'getNumOfRecords':
      return [
        validId(),
        optionalValidSensor(),
      ];
    case 'getMonthlyNumOfRecords':
      return [
        validId(),
        validYear(),
        validMonth(),
        optionalValidSensor(),
      ];
    default: return [];
  }
};
