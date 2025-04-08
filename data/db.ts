import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost', 
  database: 'test', 
  password: 'bubuplug', 
  port: 5432, 
});

export default pool;