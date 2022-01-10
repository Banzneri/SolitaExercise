import db from '../lib/db';

const FarmService = {
  getAllFarms: async () => {
    try {
      const query = 'SELECT * FROM farms';
      const farms = await db.query(query);
      return farms.rows;
    } catch (error) {
      throw Error('Error while getting all farms');
    }
  },

  getFarmById: async (id: number) => {
    try {
      const query = 'SELECT * FROM farms WHERE id = $1';
      const farm = await db.query(query, [id]);
      return farm.rows;
    } catch (error) {
      throw Error('Error while getting farm by id');
    }
  },

  getFarmByName: async (name: string) => {
    try {
      const query = 'SELECT * FROM farms WHERE name = $1';
      const farm = await db.query(query, [name]);
      return farm.rows;
    } catch (error) {
      throw Error('Error while getting farm by name');
    }
  },
};

export default FarmService;
