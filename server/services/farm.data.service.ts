import db from '../lib/db';

const FarmDataService = {
  getAllFarmData: async () => {
    try {
      const query = 'SELECT * FROM farm_data';
      const farmData = await db.query(query);
      return farmData.rows;
    } catch (error) {
      throw Error('Error getting all data');
    }
  },

  getFarmDataByFarmId: async (farmId: number) => {
    try {
      const query = 'SELECT * FROM farm_data WHERE farm_id = $1';
      const farmData = await db.query(query, [farmId]);
      return farmData.rows;
    } catch (error) {
      throw Error('Error getting data by farm id');
    }
  },

  getFarmDataByFarmIdAndSensorType: async (
    id: number,
    sensor: string,
  ) => {
    try {
      const query = 'SELECT * FROM farm_data WHERE farm_id = $1 AND sensor_type = $2';
      const farmData = await db.query(query, [id, sensor.toLowerCase()]);
      return farmData.rows;
    } catch (error) {
      throw Error('Error getting data by farm id and sensor type');
    }
  },

  getFarmDataByFarmIdAndMonthYear: async (
    farmId: number,
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
      const farmData = await db.query(query, [farmId, year, month]);
      return farmData.rows;
    } catch (error) {
      throw Error('Error getting data by farm id and month/year');
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
      const farmData = await db.query(query, [id, year, month, sensor]);
      const values = farmData.rows.map((e) => Number(e.value));
      return values.reduce((sum, value) => sum + value, 0) / farmData.rows.length;
    } catch (error) {
      throw Error(error.message);
    }
  },
};

export default FarmDataService;
