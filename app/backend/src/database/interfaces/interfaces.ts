export interface IUserId extends IUserBase {
  id: number,
}

export interface IUserPass extends IUserBase {
  password: string,
}

interface IUserBase {
  username?: string,
  role?: string,
  email?: string,
}

export interface ILogin {
  // user: IUserId,
  token: string,
}
