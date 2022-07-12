import * as bcrypt from 'bcryptjs';
import User from '../models/user';
import generateToken from '../middlewares/jwtGenerator';
import { ILogin, IUserId, IUserPass } from '../interfaces/interfaces';

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
}

export default LoginService;
