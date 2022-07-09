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
      console.log(loggedUser);
      
      return res.status(200).json(loggedUser);
    } catch (error) {
      console.log(error);
      return res.status(404).json();
    }
  };
}

export default LoginController;
