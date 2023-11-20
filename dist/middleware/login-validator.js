"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let paramsProvider = [
    (0, express_validator_1.check)('email_provider').isEmail(),
    (0, express_validator_1.check)('password_provider').isLength({ min: 1, max: 15 })
];
let paramsGrocer = [
    (0, express_validator_1.check)('email_grocer').isEmail(),
    (0, express_validator_1.check)('password_grocer').isLength({ min: 1, max: 15 })
];
function validatorParams(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
;
exports.default = {
    paramsProvider,
    paramsGrocer,
    validatorParams
};
