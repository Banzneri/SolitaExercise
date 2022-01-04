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
};

export default FarmDataService;