"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginProvider = exports.registerProvider = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
const comparePasswordService_1 = __importDefault(require("./comparePasswordService"));
const registerProvider = (data) => {
    const procInsertProviderQuery = 'call insertProvider (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message_text)';
    return new Promise((resolve, reject) => {
        configdb_1.default.query(procInsertProviderQuery, [data.nit_provider, data.email_provider, data.name_provider, data.last_name_provider, data.name_company, data.city_provider, data.password_provider, data.description_provider, data.neighborhood,
            data.street, data.number_street, data.number_provider], (error, results) => {
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
exports.registerProvider = registerProvider;
const loginProvider = (data) => {
    const getProviderQuery = 'select email_provider,password_provider from Provider WHERE email_provider = ?';
    return new Promise((resolve, reject) => {
        configdb_1.default.query(getProviderQuery, [data.email_provider, data.password_provider], (error, results) => {
            if (error) {
                reject(error);
            }
            let claveAlmacenada = results[0].password_provider;
            resolve((0, comparePasswordService_1.default)(data.password_provider, claveAlmacenada));
        });
    });
};
exports.loginProvider = loginProvider;
