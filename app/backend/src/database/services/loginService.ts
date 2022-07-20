import * as bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateToken, verifyToken } from '../utils/jwt';
import { ILogin, IUserPass, IUserRole } from '../interfaces/interfaces';
import ErrorFactory from '../utils/errorFactory';

class LoginService {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  public login = async (email: string, password: string): Promise<ILogin> => {
    const targetUser = await this.model.findOne({ where: { email } }) as IUserPass;
    if (!targetUser) throw new ErrorFactory(401, "Incorrect email or password");

    const validPass = bcrypt.compareSync(password, targetUser.password);
    if (!validPass) throw new ErrorFactory(401, "Incorrect email or password");

    const token = await generateToken(email, password);
    return { token };
  };

  // TO-DO: otimizar esse return
  public validateLogin = async (token: string): Promise<IUserRole> => {
    const authorized = await verifyToken(token);
    // console.log(authorized);
    if (!authorized) throw new ErrorFactory(420, "some error has occured");

    const targetUser = await this.model.findOne({ where: { email: authorized.email } });
    if (!targetUser) throw new ErrorFactory(420, "some error has occured");
    const { role } = targetUser;
    // console.log(targetUser);

    return { role } as IUserRole;
  }
}

export default LoginService;
