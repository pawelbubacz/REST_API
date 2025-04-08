"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.countUsers = countUsers;
exports.countWomen = countWomen;
exports.getUserById = getUserById;
exports.getUsersByEmail = getUsersByEmail;
const db_1 = __importDefault(require("../data/db"));
async function getAllUsers() {
    const result = await db_1.default.query('SELECT * FROM users');
    return result.rows;
}
async function countUsers() {
    const result = await db_1.default.query('SELECT COUNT(*) FROM users');
    return parseInt(result.rows[0].count, 10);
}
async function countWomen() {
    const result = await db_1.default.query("SELECT COUNT(*) FROM users WHERE name LIKE '%a'");
    return parseInt(result.rows[0].count, 10);
}
async function getUserById(id) {
    const result = await db_1.default.query(`SELECT * FROM users WHERE id = ${id}`);
    return result.rows[0];
}
async function getUsersByEmail(domain) {
    const result = await db_1.default.query(`SELECT * FROM users WHERE email LIKE '%${domain}%'`);
    return result.rows;
}
