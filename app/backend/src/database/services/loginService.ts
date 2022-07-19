import * as bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateToken, verifyToken } from '../middlewares/jwtGenerator';
import { ILogin, IUserPass, IUserRole } from '../interfaces/interfaces';

class LoginService {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  public login = async (email: string, password: string): Promise<ILogin> => {
    const targetUser = await this.model.findOne({ where: { email } }) as IUserPass;
    if (!targetUser) throw new Error();

    const validPass = bcrypt.compareSync(password, targetUser.password);
    if (!validPass) throw new Error();

    const token = await generateToken(email, password);
    return { token };
  };

  // TO-DO: otimizar esse return
  public validateLogin = async (token: string): Promise<IUserRole> => {
    const authorized = await verifyToken(token);
    if (!authorized) throw new Error();

    const targetUser = await this.model.findOne({ where: { email: authorized.email } }) as IUserPass;
    if (!targetUser) throw new Error();

    return {
      role: targetUser.role,
    } as IUserRole;
  }
}

export default LoginService;
