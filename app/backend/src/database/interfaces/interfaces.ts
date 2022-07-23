/// /// /// USER INTERFACES \\\ \\\ \\\
export interface IUserBase {
  username?: string,
  role?: string,
  email?: string,
}

export interface IUserId extends IUserBase {
  id: number,
}

export interface IUserPass extends IUserBase {
  password: string,
}

export interface ILogin {
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
export interface IMatchReq {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface IMatch extends IMatchReq {
  id?: number,
  inProgress: boolean,
}

export interface IMatchResponse extends IMatch {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  },
}

export interface IOngoingMatch {
  homeTeamGoals: number,
  awayTeamGoals: number
}

/// /// /// UTILS INTERFACES \\\ \\\ \\\
export interface Error {
  status: number,
  message: string,
}
