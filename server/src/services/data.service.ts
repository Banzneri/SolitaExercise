import db from '../lib/db';

const perPage = 15;

const getOffset = (page: number) => (page - 1) * perPage;

// TODO: add pagination
const DataService = {
  getAllData: async (page: number) => {
    try {
      const query = `
        SELECT * FROM farm_data
        LIMIT $1 OFFSET $2
      `;
      const data = await db.query(query, [perPage, getOffset(page)]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting all data: ${error.message}`);
    }
  },

  getDataByFarmId: async (id: number, page: number) => {
    try {
      const query = `
        SELECT id, farm_id as "farmId", time as "dateTime", sensor_type as "sensorType", value
        FROM farm_data
        WHERE farm_id = $1
        LIMIT $2 OFFSET $3
      `;
      const data = await db.query(query, [id, perPage, getOffset(page)]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting data by farm id: ${error.message}`);
    }
  },

  getDataByFarmIdAndSensor: async (
    id: number,
    sensor: string,
    page: number,
  ) => {
    try {
      const query = `
        SELECT farm_id as "farmId", time as "dateTime", sensor_type as "sensorType", value
        FROM farm_data
        WHERE farm_id = $1
        AND sensor_type = $2
        LIMIT $3 OFFSET $4
       `;
      const data = await db.query(query, [id, sensor, perPage, getOffset(page)]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting sensor data: ${error.message}`);
    }
  },

  getAllMonthlyData: async (
    id: number,
    year: number,
    month: number,
    page: number,
  ) => {
    try {
      const query = `
        SELECT farm_id as "farmId", time as "dateTime", sensor_type as "sensorType", value
        FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
        LIMIT $4 OFFSET $5
      `;
      const data = await db.query(query, [id, year, month, perPage, getOffset(page)]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting data by month: ${error.message}`);
    }
  },

  getMonthlyData: async (
    id: number,
    year: number,
    month: number,
    sensor: string,
    page: number,
  ) => {
    try {
      const query = `
        SELECT farm_id as "farmId", time as "dateTime", sensor_type as "sensorType", value
        FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
        AND sensor_type = $4
        LIMIT $5 OFFSET $6
      `;
      const data = await db.query(
        query,
        [id, year, month, sensor, perPage, getOffset(page)],
      );
      return data.rows;
    } catch (error) {
      throw Error(`Error getting monthly data by sensor: ${error.message}`);
    }
  },

  getAllTimeAverage: async (
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

  getMonthlyAverage: async (
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

  getAllTimeMinMax: async (
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
      throw Error(`Error getting all time min max: ${error.message}`);
    }
  },

  getMonthlyMinMax: async (
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

  getSensorDataBetweenDates: async (
    id: number,
    startDate: Date,
    endDate: Date,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT farm_id as "farmId", time as "dateTime", sensor_type as "sensorType", value
        FROM farm_data
        WHERE farm_id = $1
        AND time BETWEEN $2 AND $3
        AND sensor_type = $4
      `;
      const data = await db.query(query, [id, startDate, endDate, sensor]);
      return data.rows;
    } catch (error) {
      throw Error(`Error getting data between dates: ${error.message}`);
    }
  },

  getNumOfRecordsByFarmId: async (
    id: number,
  ) => {
    try {
      const query = `
        SELECT COUNT(*) as records
        FROM farm_data
        WHERE farm_id = $1
      `;
      const data = await db.query(query, [id]);
      return data.rows[0].records;
    } catch (error) {
      throw Error(`Error getting total number of records by farm: ${error.message}`);
    }
  },

  getNumOfRecordsByFarmIdAndSensor: async (
    id: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT COUNT(*) as records
        FROM farm_data
        WHERE farm_id = $1
        AND sensor_type = $2
      `;
      const data = await db.query(query, [id, sensor]);
      return data.rows[0].records;
    } catch (error) {
      throw Error(`Error getting total number of records by farm id and sensor: ${error.message}`);
    }
  },

  getMonthlyNumOfRecordsByFarmId: async (
    id: number,
    year: number,
    month: number,
  ) => {
    try {
      const query = `
        SELECT COUNT(*) as records
        FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
      `;
      const data = await db.query(query, [id, year, month]);
      return data.rows[0].records;
    } catch (error) {
      throw Error(`Error getting monthly number of records by farm id: ${error.message}`);
    }
  },

  getMonthlyNumOfRecordsByFarmIdAndSensor: async (
    id: number,
    year: number,
    month: number,
    sensor: string,
  ) => {
    try {
      const query = `
        SELECT COUNT(*) as records
        FROM farm_data
        WHERE farm_id = $1
        AND EXTRACT(YEAR FROM time) = $2
        AND EXTRACT(MONTH FROM time) = $3
        AND sensor_type = $4
      `;
      const data = await db.query(query, [id, year, month, sensor]);
      return data.rows[0].records;
    } catch (error) {
      throw Error(`Error getting monthly number of records by farm id and sensor: ${error.message}`);
    }
  },
};

export default DataService;
