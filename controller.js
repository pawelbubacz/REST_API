"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = welcome;
exports.getUsers = getUsers;
exports.countUsers = countUsers;
exports.countWomen = countWomen;
exports.getUserById = getUserById;
exports.getUsersByEmail = getUsersByEmail;
exports.getTshirt = getTshirt;
const userService = __importStar(require("./service"));
function welcome(req, res) {
    res.send('Welcome to the Usaaaers API!');
}
function getUsers(req, res) {
    res.type('json').send(JSON.stringify(userService.getAllUsers(), null, 2));
}
function countUsers(req, res) {
    res.json({ userCount: userService.countUsers() });
}
function countWomen(req, res) {
    res.json({ womenCount: userService.countWomen() });
}
function getUserById(req, res) {
    const user = userService.getUserById(parseInt(req.params.id));
    res.json(user);
}
function getUsersByEmail(req, res) {
    const domain = req.params.domain;
    const users = userService.getUsersByEmailDomain(domain);
    res.json(users);
}
function getTshirt(req, res) {
    const { id } = req.params;
    const { logo } = req.body;
    res.send({
        tshirt: `tshirt with your logo ${logo} and an ID of ${id}`
    });
}
