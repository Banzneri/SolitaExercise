import axios from 'axios';

const BASE_URL = 'http://localhost:3001/farms';

export const getAllFarms = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getFarmById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
