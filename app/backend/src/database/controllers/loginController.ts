import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const loggedUser = await this.service.login(email, password);
      return res.status(200).json(loggedUser);
    } catch (error) {
      console.log(error);
      return res.status(404).end();
    }
  };

  public validateLogin = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers;
      const auth = authorization as string;
      // if (typeof authorization === 'string') {
      const userRole = await this.service.validateLogin(auth);
      return res.status(200).json(userRole);
      // }
    } catch (error) {
      console.log(error);
      return res.status(404).end();
    }
  }
}

export default LoginController;
