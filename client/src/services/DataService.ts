import axios from 'axios';

const BASE_URL = 'http://localhost:3001/data/farm';

export const getDataByFarmId = async (id: number, page?: number, sensor?: string) => {
  const response = await axios
    .get(`${BASE_URL}/${id}`, { params: { page, sensor } });
  return response.data;
};

export const getMonthlyData = async (
  id: number,
  year: number,
  month: number,
  page?: number,
  sensor?: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}`, { params: { page, sensor } });
  return response.data;
};

export const getAllTimeAverage = async (
  id: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/average`, { params: { sensor } });
  return response.data;
};

export const getMonthlyAverage = async (
  id: number,
  year: number,
  month: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}/average`, { params: { sensor } });
  return response.data;
};

export const getAllTimeMinMax = async (
  id: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/min-max`, { params: { sensor } });
  return response.data;
};

export const getMonthlyMinMax = async (
  id: number,
  year: number,
  month: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}/min-max`, { params: { sensor } });
  return response.data;
};

export const getSensorDataBetweenDates = async (
  id: number,
  startDate: Date,
  endDate: Date,
  sensor: string,
) => {
  const start = startDate.toISOString();
  const end = endDate.toISOString();
  const response = await axios
    .get(`${BASE_URL}/${id}/timespan/${start}&${end}`, { params: { sensor } });
  return response.data;
};

export const getNumOfRecordsByFarmId = async (
  id: number,
  sensor?: string,
) => {
  console.log(sensor);
  const response = await axios.get(`${BASE_URL}/${id}/total`, { params: { sensor } });
  return parseInt(response.data, 10);
};

export const getMonthlyNumOfRecordsByFarmId = async (
  id: number,
  year: number,
  month: number,
  sensor?: string,
) => {
  console.log(sensor);
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}/total`, { params: { sensor } });
  return parseInt(response.data, 10);
};
