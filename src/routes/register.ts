import { Router } from 'express';
import { provider, grocer } from '../controllers/register-controller'
import validator from '../middleware/register-validator'

const router = Router();

router.post('/provider', validator.paramsProvider, validator.validatorParams, provider);
router.post('/grocer', validator.paramsGrocer, validator.validatorParams, grocer);

export default router;