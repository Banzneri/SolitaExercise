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

  getDataByFarmId: async (farmId: number) => {
    try {
      const query = 'SELECT * FROM farm_data WHERE farm_id = $1';
      const data = await db.query(query, [farmId]);
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

  getMonthlyAverageByFarmIdAndSensor: async (
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
      const values = data.rows.map((e) => Number(e.value));
      return values.reduce((sum, value) => sum + value, 0) / data.rows.length;
    } catch (error) {
      throw Error(`Error getting monthly average: ${error.message}`);
    }
  },
};

export default FarmDataService;
