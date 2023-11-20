import Server from "./server";
import dotenv from 'dotenv';
import conection from './config/configdb';

// Configuramos dotenv 
dotenv.config();

// Instanciamos el servidor
const server = new Server();

server.listen();

// Conectamos la db
conection;