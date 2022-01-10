import { Request, Response } from 'express';
import { respondError, respondResults } from '../lib/utils';
import FarmService from '../services/farm.service';

export const getAllFarms = async (
  req: Request,
  res: Response,
) => {
  try {
    const results = await FarmService.getAllFarms();
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getFarmById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const results = await FarmService.getFarmById(Number(id));
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};

export const getFarmByName = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name } = req.params;
    const results = await FarmService.getFarmByName(name);
    return respondResults(res, results);
  } catch (error) {
    return respondError(res, 404, error.message);
  }
};
