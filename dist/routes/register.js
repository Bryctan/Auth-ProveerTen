"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controllers/register-controller");
const register_validator_1 = __importDefault(require("../middleware/register-validator"));
const router = (0, express_1.Router)();
router.post('/provider', register_validator_1.default.paramsProvider, register_validator_1.default.validatorParams, register_controller_1.provider);
router.post('/grocer', register_validator_1.default.paramsGrocer, register_validator_1.default.validatorParams, register_controller_1.grocer);
exports.default = router;
