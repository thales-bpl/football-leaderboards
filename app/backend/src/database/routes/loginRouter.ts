import { Router } from 'express';
import LoginController from '../controllers/loginController';
import loginValidator from '../middlewares/loginValidator';
import tokenValidator from '../middlewares/tokenValidator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rescue = require('express-rescue');

const router = Router();
const loginController = new LoginController();

router
  .post('/', loginValidator, rescue(loginController.login))
  .get('/validate', tokenValidator, rescue(loginController.validateLogin));

export default router;
