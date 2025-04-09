import pool from '../data/db';

export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM user_data');
  return result.rows;
}

export async function countUsers() {
  const result = await pool.query('SELECT COUNT(*) FROM user_data');
  return parseInt(result.rows[0].count, 10);
}

export async function countWomen() {
  const result = await pool.query("SELECT COUNT(*) FROM user_data WHERE name LIKE '%a'");
  return parseInt(result.rows[0].count, 10);
}

export async function getUserById(id: number) {
  const result = await pool.query(`SELECT * FROM user_data WHERE id = ${id}`);
  return result.rows[0];
}

export async function getUsersByEmail(domain: string) {
  const result = await pool.query(`SELECT * FROM user_data WHERE email LIKE '%${domain}%'`);
  return result.rows;
}

