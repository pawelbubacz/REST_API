"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT * FROM user_data');
        return result.rows;
    });
}
function countUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query('SELECT COUNT(*) FROM user_data');
        return parseInt(result.rows[0].count, 10);
    });
}
function countWomen() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT COUNT(*) FROM user_data WHERE name LIKE '%a'");
        return parseInt(result.rows[0].count, 10);
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT * FROM user_data WHERE id = ${id}`);
        return result.rows[0];
    });
}
function getUsersByEmail(domain) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT * FROM user_data WHERE email LIKE '%${domain}%'`);
        return result.rows;
    });
}
