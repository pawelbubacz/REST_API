import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'host.docker.internal', 
  database: process.env.DB_NAME || 'users',
  password: process.env.DB_PASSWORD || 'bubuplug',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default pool;