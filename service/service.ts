import pool from '../data/db';

export async function getFilteredUsers(filters: { [key: string]: string }) {
  const conditions: string[] = [];
  const values: string[] = [];

  Object.entries(filters).forEach(([key, value], index) => {
    conditions.push(`${key} ILIKE $${index + 1}`);
    values.push(`%${value}%`);
  });

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM user_data ${whereClause}`;
  const result = await pool.query(query, values);

  return result.rows;
}

export async function countUsers() {
  const result = await pool.query('SELECT COUNT(*) FROM user_data');
  return parseInt(result.rows[0].count, 10);
}

export async function countWomen() {
  const result = await pool.query('SELECT COUNT(*) FROM user_data WHERE name LIKE $1', ['%a']);
  return parseInt(result.rows[0].count, 10);
}

export async function getUserById(id: number) {
  if (isNaN(id)) {
    throw new Error(`Id has to be a number`);
  }

  const result = await pool.query('SELECT * FROM user_data WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new Error(`User with id ${id} not found`);
  }
  return result.rows[0];
}

export async function getUsersByDomain(domain: string) {
  if (domain.length < 3) {
    throw new Error(`Domain ${domain} is too short`);
  }

  const result = await pool.query('SELECT * FROM user_data WHERE email LIKE $1', [`%${domain}%`]);
  if (result.rows.length === 0) {
    throw new Error(`No users found with email domain ${domain}`);
  }

  return result.rows;
}