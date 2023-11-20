"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
function comparePassword(password, claveAlmacenada) {
    if (bcrypt_1.default.compareSync(password, claveAlmacenada)) {
        return true;
    }
    else {
        return false;
    }
}
exports.default = comparePassword;
