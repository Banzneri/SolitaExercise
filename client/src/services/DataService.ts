import axios from 'axios';

const BASE_URL = 'http://localhost:3001/data/farm';

export const getDataByFarmId = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getDataByFarmIdAndSensor = async (id: number, sensor: string) => {
  const response = await axios.get(`${BASE_URL}/${id}/sensor/${sensor}`);
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
