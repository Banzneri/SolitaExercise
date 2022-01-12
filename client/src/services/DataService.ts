import axios from 'axios';

const BASE_URL = 'http://172.18.195.65:3001/data/farm';

export const getDataByFarmId = async (id: number, page?: number) => {
  const response = await axios.get(`${BASE_URL}/${id}/?page=${page || 1}`);
  return response.data;
};

export const getDataByFarmIdAndSensor = async (id: number, sensor: string, page?: number) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/sensor/${sensor}/?page=${page || 1}`);
  return response.data;
};

export const getMonthlyData = async (
  id: number,
  year: number,
  month: number,
) => {
  const response = await axios.get(`${BASE_URL}/${id}/month/${year}&${month}`);
  return response.data;
};

export const getMonthlySensorData = async (
  id: number,
  year: number,
  month: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}/sensor/${sensor}`);
  return response.data;
};

export const getAllTimeAverage = async (
  id: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/sensor/${sensor}/average`);
  return response.data;
};

export const getMonthlyAverage = async (
  id: number,
  year: number,
  month: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}/sensor/${sensor}/average`);
  return response.data;
};

export const getAllTimeMinMax = async (
  id: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/sensor/${sensor}/min-max`);
  return response.data;
};

export const getMonthlyMinMax = async (
  id: number,
  year: number,
  month: number,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/month/${year}&${month}/sensor/${sensor}/min-max`);
  return response.data;
};

export const getSensorDataBetweenDates = async (
  id: number,
  start: Date,
  end: Date,
  sensor: string,
) => {
  const response = await axios
    .get(`${BASE_URL}/${id}/timespan/${start.toISOString()}&${end.toISOString()}/sensor/${sensor}`);
  return response.data;
};

export const getNumOfRecordsByFarmId = async (
  id: number,
) => {
  const response = await axios.get(`${BASE_URL}/${id}/total`);
  return parseInt(response.data, 10);
};

export const getNumOfRecordsByFarmIdAndSensor = async (
  id: number,
  sensor: string,
) => {
  const response = await axios.get(`${BASE_URL}/${id}/sensor/${sensor}/total`);
  return parseInt(response.data, 10);
};
