import { Router } from 'express';
import LoginController from '../controllers/loginController';
import { loginValidator } from '../middlewares/loginValidator';

const router = Router();
const loginController = new LoginController();

router.post('/', loginValidator, loginController.login);

export default router;