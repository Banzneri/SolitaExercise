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
  const response = byMonth
    ? await axios
        .get(`${BASE_URL}/${id}/month/${year}&${month}`, { params: { page, sensor } })
    : await axios
      .get(`${BASE_URL}/${id}`, { params: { page, sensor } });
  return response.data;
};

export const getAverage = async (
  id: number,
  sensor: string,
  byMonth: boolean,
  year?: number,
  month?: number,
) => {
  const response = byMonth
    ? await axios
        .get(`${BASE_URL}/${id}/month/${year}&${month}/average`, { params: { sensor } })
    : await axios
        .get(`${BASE_URL}/${id}/average`, { params: { sensor } });
  return response.data;
};

export const getMinMax = async (
  id: number,
  sensor: string,
  byMonth: boolean,
  year?: number,
  month?: number,
) => {
  const response = byMonth
    ? await axios
      .get(`${BASE_URL}/${id}/month/${year}&${month}/min-max`, { params: { sensor } })
    : await axios.get(`${BASE_URL}/${id}/min-max`, { params: { sensor } });
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

export const getNumOfRecords = async (
  id: number,
  sensor?: string,
  byMonth?: boolean,
  year?: number,
  month?: number,
) => {
  const response = byMonth
    ? await axios
        .get(`${BASE_URL}/${id}/month/${year}&${month}/total`, { params: { sensor } })
    : await axios.get(`${BASE_URL}/${id}/total`, { params: { sensor } });
  return response.data;
};
