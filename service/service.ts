import pool from '../data/db';

export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

export async function countUsers() {
  const result = await pool.query('SELECT COUNT(*) FROM users');
  return parseInt(result.rows[0].count, 10);
}

export async function countWomen() {
  const result = await pool.query("SELECT COUNT(*) FROM users WHERE name LIKE '%a'");
  return parseInt(result.rows[0].count, 10);
}

export async function getUserById(id: number) {
  const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  return result.rows[0];
}

export async function getUsersByEmail(domain: string) {
  const result = await pool.query(`SELECT * FROM users WHERE email LIKE '%${domain}%'`);
  return result.rows;
}

