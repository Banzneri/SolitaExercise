import axios from 'axios';

const BASE_URL = 'http://localhost:3001/data/farm';

export const getData = async (
  id: number,
  page?: number,
  sensor?: string,
  byMonth?: boolean,
  year?: number,
  month?: number,
) => {
  const url1 = `${BASE_URL}/${id}/month/${year}&${month}`;
  const url2 = `${BASE_URL}/${id}`;
  const response = byMonth
    ? await axios.get(url1, { params: { page, sensor } })
    : await axios.get(url2, { params: { page, sensor } });
  return response.data;
};

export const getAverage = async (
  id: number,
  sensor: string,
  byMonth: boolean,
  year?: number,
  month?: number,
) => {
  const url1 = `${BASE_URL}/${id}/month/${year}&${month}/average`;
  const url2 = `${BASE_URL}/${id}/average`;
  const response = byMonth
    ? await axios.get(url1, { params: { sensor } })
    : await axios.get(url2, { params: { sensor } });
  return response.data;
};

export const getMinMax = async (
  id: number,
  sensor: string,
  byMonth: boolean,
  year?: number,
  month?: number,
) => {
  const url1 = `${BASE_URL}/${id}/month/${year}&${month}/min-max`;
  const url2 = `${BASE_URL}/${id}/min-max`;
  const response = byMonth
    ? await axios.get(url1, { params: { sensor } })
    : await axios.get(url2, { params: { sensor } });
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
  const url = `${BASE_URL}/${id}/timespan/${start}&${end}`;
  const response = await axios.get(url, { params: { sensor } });
  return response.data;
};

export const getNumOfRecords = async (
  id: number,
  sensor?: string,
  byMonth?: boolean,
  year?: number,
  month?: number,
) => {
  const url1 = `${BASE_URL}/${id}/month/${year}&${month}/total`;
  const url2 = `${BASE_URL}/${id}/total`;
  const response = byMonth
    ? await axios.get(url1, { params: { sensor } })
    : await axios.get(url2, { params: { sensor } });
  return response.data;
};
