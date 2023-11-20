"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login-controller");
const login_validator_1 = __importDefault(require("../middleware/login-validator"));
const router = (0, express_1.Router)();
router.post('/provider', login_validator_1.default.paramsProvider, login_validator_1.default.validatorParams, login_controller_1.provider);
router.post('/grocer', login_validator_1.default.paramsGrocer, login_validator_1.default.validatorParams, login_controller_1.grocer);
exports.default = router;
