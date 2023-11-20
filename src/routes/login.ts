import { Router } from 'express';
import { provider, grocer } from '../controllers/login-controller'
import validator from '../middleware/login-validator'

const router = Router();

router.post('/provider', validator.paramsProvider, validator.validatorParams, provider);
router.post('/grocer', validator.paramsGrocer, validator.validatorParams, grocer);

export default router;