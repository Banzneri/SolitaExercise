import db from '../lib/db';

const FarmDataService = {
  getAllData: async () => {
    try {
      const query = 'SELECT * FROM farm_data';
      const data = await db.query(query);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting all data: ${error.message}`);
    }
  },

  getDataByFarmId: async (id: number) => {
    try {
      const query = 'SELECT * FROM farm_data WHERE farm_id = $1';
      const data = await db.query(query, [id]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting data by farm id: ${error.message}`);
    }
  },

  getDataByFarmIdAndSensor: async (
    id: number,
    sensor: string,
  ) => {
    try {
      const query = 'SELECT * FROM farm_data WHERE farm_id = $1 AND sensor_type = $2';
      const data = await db.query(query, [id, sensor.toLowerCase()]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting sensor data: ${error.message}`);
    }
  },

  getMonthlyDataByFarmId: async (
    id: number,
    year: number,
    month: number,
  ) => {
    try {
      const query = `
        SELECT * FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
      `;
      const data = await db.query(query, [id, year, month]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting data by month: ${error.message}`);
    }
  },

  getMonthlyDataByFarmIdAndSensor: async (
    id: number,
    year: number,
    month: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT * FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
        AND sensor_type = $4
      `;
      const data = await db.query(query, [id, year, month, sensor]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting monthly data by sensor: ${error.message}`);
    }
  },

  getAllTimeAverageByFarmIdAndSensor: async (
    id: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT AVG(value) as average
        FROM farm_data
        WHERE farm_id = $1
        AND sensor_type = $2
      `;
      const data = await db.query(query, [id, sensor]);
      const { average } = data.rows[0];
      return Number(average);
    } catch (error) {
      throw Error(`Error getting all time average by farm: ${error.message}`);
    }
  },

  getMonthlyAverageByFarmIdAndSensor: async (
    id: number,
    year: number,
    month: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT AVG(value) as average
        FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
        AND sensor_type = $4
      `;
      const data = await db.query(query, [id, year, month, sensor]);
      const { average } = data.rows[0];
      return Number(average);
    } catch (error) {
      throw Error(`Error getting monthly average: ${error.message}`);
    }
  },

  getAllTimeMinMaxByFarmIdAndSensor: async (
    id: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT MIN(value) as min, MAX(value) as max
        FROM farm_data
        WHERE farm_id = $1
        AND sensor_type = $2
      `;
      const data = await db.query(query, [id, sensor]);
      const { min, max } = data.rows[0];
      return { min: Number(min), max: Number(max) };
    } catch (error) {
      throw Error(`Error getting all time min max sensor value: ${error.message}`);
    }
  },

  getMonthlyMinMaxByFarmIdAndSensor: async (
    id: number,
    year: number,
    month: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT MIN(value) as min, MAX(value) as max
        FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
        AND sensor_type = $4
      `;
      const data = await db.query(query, [id, year, month, sensor]);
      const { min, max } = data.rows[0];
      return { min: Number(min), max: Number(max) };
    } catch (error) {
      throw Error(`Error getting monthly min max: ${error.message}`);
    }
  },
};

export default FarmDataService;
