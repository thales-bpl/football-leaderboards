import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const allUsers = await this.service.getAll();
    return res.status(200).json(allUsers);
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loggedUser = await this.service.login(email, password);
    return res.status(200).json(loggedUser);
  };

  public validateLogin = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userRole = await this.service.validateLogin(email);
    return res.status(200).json(userRole);
  };
}

export default LoginController;
