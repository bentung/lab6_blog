import * as db from '../helpers/database';

export const getById = async (id: any) => {}

export const getAll = async() => {
  let query = 'SELECT * FROM articles';
  let data = await db.run_query(query, null);
  return data;
}