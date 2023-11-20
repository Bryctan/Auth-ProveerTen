import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express'

let paramsProvider: any = [
  check('email_provider').isEmail(),
  check('password_provider').isLength({ min: 1, max: 15 })
];

let paramsGrocer: any = [
  check('email_grocer').isEmail(),
  check('password_grocer').isLength({ min: 1, max: 15 })
];

function validatorParams(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};


export default {
  paramsProvider,
  paramsGrocer,
  validatorParams
}