import * as bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateToken } from '../utils/jwt';
import { ILogin, IUserId, IUserPass, IUserRole } from '../interfaces/interfaces';
import ErrorFactory from '../utils/errorFactory';

class LoginService {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  public getAll = async (): Promise<IUserId[]> => {
    const allUsers = await this.model.findAll();
    return allUsers as IUserId[];
  };

  public login = async (email: string, password: string): Promise<ILogin> => {
    const targetUser = await this.model.findOne({ where: { email } }) as IUserPass;
    if (!targetUser) throw new ErrorFactory(401, 'Incorrect email or password');

    const validPass = bcrypt.compareSync(password, targetUser.password);
    if (!validPass) throw new ErrorFactory(401, 'Incorrect email or password');

    const token = await generateToken(email, password);
    return { token };
  };

  public validateLogin = async (email: string): Promise<IUserRole> => {
    const targetUser = await this.model.findOne({ where: { email } });
    if (!targetUser) throw new ErrorFactory(404, 'User not found');

    const { role } = targetUser;
    return { role } as IUserRole;
  };
}

export default LoginService;
