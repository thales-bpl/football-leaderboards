/// /// /// USER INTERFACES \\\ \\\ \\\
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

/// /// /// TEAM INTERFACES \\\ \\\ \\\
export interface ITeam {
  id?: number,
  teamName: string
}

/// /// /// MATCH INTERFACES \\\ \\\ \\\
export interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchResponse {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  },
}

/// /// /// UTILS INTERFACES \\\ \\\ \\\
export interface Error {
  status: number,
  message: string,
}

// export interface ILooseObject {
//   [key: string]: number || string
// }

// const matchtype = number || string;
