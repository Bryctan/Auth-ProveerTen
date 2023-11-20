"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let generateToken = (properties, key, expiration, delay = 0) => {
    const token = jsonwebtoken_1.default.sign(properties, key, {
        expiresIn: expiration,
        notBefore: delay,
    });
    return token;
};
exports.default = generateToken;
