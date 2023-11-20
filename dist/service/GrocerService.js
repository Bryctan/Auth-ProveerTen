"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGrocer = exports.registerGrocer = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
const comparePasswordService_1 = __importDefault(require("./comparePasswordService"));
const registerGrocer = (data) => {
    const procInsertGrocerQuery = 'call insertGrocer (?,?,?,?,?,?,?,?,?,?,@message_text);';
    return new Promise((resolve, reject) => {
        configdb_1.default.query(procInsertGrocerQuery, [
            data.email_grocer, data.name_grocer, data.last_name_grocer, data.name_store, data.city_grocer, data.password_grocer,
            data.number_grocer, data.neighborhood, data.street, data.number_street
        ], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                const message = results[0][0].message_text;
                const success = message.includes('successfully');
                resolve({ success, message });
            }
        });
    });
};
exports.registerGrocer = registerGrocer;
const loginGrocer = (data) => {
    const getGrocerQuery = 'SELECT email_grocer,password_grocer FROM Grocer WHERE email_grocer = ?';
    return new Promise((resolve, reject) => {
        configdb_1.default.query(getGrocerQuery, [data.email_grocer, data.password_grocer], (error, results) => {
            if (error) {
                reject(error);
            }
            let claveAlmacenada = results[0].password_grocer;
            resolve((0, comparePasswordService_1.default)(data.password_grocer, claveAlmacenada));
        });
    });
};
exports.loginGrocer = loginGrocer;
