import * as db from '../helpers/database';

export const getById = async (id: any) => {
  let query = 'SELECT * FROM articles WHERE ID = ?';
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

export const getAll = async () => {
  let query = 'SELECT * FROM articles';
  let data = await db.run_query(query, null);
  return data;
}

export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let param = '';

  for (let i: number = 0; i < values.length; i++) { param += '?,' }
  param = param.slice(0, -1);

  let query = `INSERT INTO articles (${key}) VALUES (${param})`;

  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const update = async (article: any, id: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let param = '';

  for (let i: number = 0; i < values.length; i++) { param += `${keys[i]} = ?,` }
  param = param.slice(0, -1);

  let query = `UPDATE articles SET ${param} WHERE ID = ${id};`;

  try {
    await db.run_update(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const deleteArticle = async (id: any) => {
  let query = 'DELETE FROM articles WHERE ID = ?';
  let values = [id];
  let data = await db.run_delete(query, values);
  console.log(data);
  return data;
}