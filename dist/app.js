"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const dotenv_1 = __importDefault(require("dotenv"));
const configdb_1 = __importDefault(require("./config/configdb"));
// Configuramos dotenv 
dotenv_1.default.config();
// Instanciamos el servidor
const server = new server_1.default();
server.listen();
// Conectamos la db
configdb_1.default;
