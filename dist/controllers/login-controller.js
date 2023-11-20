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
exports.grocer = exports.provider = void 0;
const ProviderService_1 = require("../service/ProviderService");
const GrocerService_1 = require("../service/GrocerService");
const generator_tokens_1 = __importDefault(require("../helpers/generator-tokens"));
const provider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email_provider, password_provider } = req.body;
        if (!password_provider) {
            return res.status(400).json({ Status: 'La contraseña es obligatoria' });
        }
        const data = {
            email_provider,
            password_provider
        };
        let response = yield (0, ProviderService_1.loginProvider)(data);
        if (response) {
            let secret_key = process.env.SIGNING_KEY_TOKEN;
            let token = (0, generator_tokens_1.default)({ role: "provider", email: email_provider }, secret_key, new Date().getTime() + (2 * 60 * 1000));
            return res.status(200).json({ status: 'Successful authentication', token: token });
        }
        else {
            return res.status(401).json({ Status: 'Credenciales incorrectas' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: `Error al registrar proveedor`
        });
    }
});
exports.provider = provider;
const grocer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email_grocer, password_grocer } = req.body;
        if (!password_grocer) {
            return res.status(400).json({ Status: 'La contraseña es obligatoria' });
        }
        const data = {
            email_grocer,
            password_grocer
        };
        let response = yield (0, GrocerService_1.loginGrocer)(data);
        if (response) {
            let secret_key = process.env.SIGNING_KEY_TOKEN;
            let token = (0, generator_tokens_1.default)({ role: "grocer", email: email_grocer }, secret_key, new Date().getTime() + (2 * 60 * 1000));
            return res.status(200).json({ status: 'Successful authentication', token: token });
        }
        else {
            return res.status(401).json({ Status: 'Credenciales incorrectas' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: `Error al registrar tendero`
        });
    }
});
exports.grocer = grocer;
