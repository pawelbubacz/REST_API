"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'test',
    password: process.env.DB_PASSWORD || 'bubuplug',
    port: parseInt(process.env.DB_PORT || '5432', 10),
});
exports.default = pool;
