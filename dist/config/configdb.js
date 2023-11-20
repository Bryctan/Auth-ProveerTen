"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
const connection = mysql2_1.default.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
connection.connect((error) => {
    if (error) {
        console.error(`Error connecting to the database "${process.env.DATABASE}"`, error);
    }
    else {
        console.log(`Connection established with the database "${process.env.DATABASE}"`);
    }
});
exports.default = connection;
