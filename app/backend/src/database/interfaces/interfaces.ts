export interface IUserId extends IUserBase {
  id: number,
}

export interface IUserPass extends IUserBase {
  password: string,
}

export interface IUserBase {
  username?: string,
  role?: string,
  email?: string,
}

export interface ILogin {
  // user: IUserId,
  token: string,
}

export interface IUserRole {
  role: string;
}

export interface Error {
  status: number,
  message: string;
}