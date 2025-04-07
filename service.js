"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.countUsers = countUsers;
exports.countWomen = countWomen;
exports.getUserById = getUserById;
exports.getUsersByEmailDomain = getUsersByEmailDomain;
const users_1 = require("./users");
function getAllUsers() {
    return users_1.users;
}
function countUsers() {
    return users_1.users.length;
}
function countWomen() {
    return users_1.users.filter(user => user.name.slice(-1) === 'a').length;
}
function getUserById(id) {
    return users_1.users.find(user => user.id === id);
}
function getUsersByEmailDomain(domain) {
    return users_1.users.filter(user => user.email.split('@')[1] === domain);
}
