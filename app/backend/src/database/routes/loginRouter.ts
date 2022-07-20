import { Router } from 'express';
import LoginController from '../controllers/loginController';
import { loginValidator } from '../middlewares/loginValidator';
// import errorMiddleware from '../middlewares/errorMiddleware';

const router = Router();
const loginController = new LoginController();

router
  .post('/', loginValidator, loginController.login)
  .get('/validate', loginController.validateLogin);

export default router;