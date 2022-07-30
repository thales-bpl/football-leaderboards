import { IMatch } from '../interfaces/interfaces';

export const calcPoints = (wins: number, draws: number) => (wins * 3) + draws;

export const calcPoints2 = (gamesAsHomeTeam: IMatch[], gamesAsAwayTeam: IMatch[]): number => {
  const pointsAsHome = gamesAsHomeTeam.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (homeTeamGoals > awayTeamGoals) return prev + 3;
    if (homeTeamGoals === awayTeamGoals) return prev + 1;
    if (homeTeamGoals < awayTeamGoals) return prev;
    return prev;
  }, 0);

  const pointsAsAway = gamesAsAwayTeam.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (awayTeamGoals > homeTeamGoals) return prev + 3;
    if (awayTeamGoals === homeTeamGoals) return prev + 1;
    if (awayTeamGoals < homeTeamGoals) return prev;
    return prev;
  }, 0);

  return pointsAsHome + pointsAsAway;
};

export const calcWins = (gamesAsHomeTeam: IMatch[], gamesAsAwayTeam: IMatch[]): number => {
  const winsAsHome = gamesAsHomeTeam.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (homeTeamGoals > awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const winsAsAway = gamesAsAwayTeam.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (awayTeamGoals > homeTeamGoals) return prev + 1;
    return prev;
  }, 0);

  return winsAsHome + winsAsAway;
};

export const calcDraws = (teamCampaign: IMatch[]) => {
  const draws = teamCampaign.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (homeTeamGoals === awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  return draws;
};

export const calcLosses = (gamesAsHomeTeam: IMatch[], gamesAsAwayTeam: IMatch[]) => {
  const lossesAsHome = gamesAsHomeTeam.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (homeTeamGoals < awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const lossesAsAway = gamesAsAwayTeam.reduce((prev, curr) => {
    const { homeTeamGoals, awayTeamGoals } = curr;
    if (awayTeamGoals < homeTeamGoals) return prev + 1;
    return prev;
  }, 0);

  return lossesAsHome + lossesAsAway;
};

export const calcEfficiency = (matches: number, points: number) => (points / (matches * 3)) * 100;

export const calcEfficiency2 = (matches: number, gamesAsHome: IMatch[], gamesAsAway: IMatch[]) => {
  const teamPoints = calcPoints2(gamesAsHome, gamesAsAway);
  return (teamPoints / (matches * 3)) * 100;
};

export const calcGoalsFavor = (gamesAsHomeTeam: IMatch[], gamesAsAwayTeam: IMatch[]) => {
  const goalsAsHome = gamesAsHomeTeam.reduce((prev, curr) => prev + curr.homeTeamGoals, 0);
  const goalsAsAway = gamesAsAwayTeam.reduce((prev, curr) => prev + curr.awayTeamGoals, 0);

  return goalsAsHome + goalsAsAway;
};

export const calcGoalsOwn = (gamesAsHomeTeam: IMatch[], gamesAsAwayTeam: IMatch[]) => {
  const goalsOwnAsHome = gamesAsHomeTeam.reduce((prev, curr) => prev + curr.awayTeamGoals, 0);
  const goalsOwnAsAway = gamesAsAwayTeam.reduce((prev, curr) => prev + curr.homeTeamGoals, 0);

  return goalsOwnAsHome + goalsOwnAsAway;
};

export const calcGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

export const calcGoalsBalance2 = (gamesAsHomeTeam: IMatch[], gamesAsAwayTeam: IMatch[]) => {
  const goalsFavor = calcGoalsFavor(gamesAsHomeTeam, gamesAsAwayTeam);
  const goalsOwn = calcGoalsOwn(gamesAsHomeTeam, gamesAsAwayTeam);

  return goalsFavor - goalsOwn;
};

export const teamCampaignStats = (teamCampaign: IMatch[], teamId: number) => {
  const totalGames = teamCampaign.length;

  const gamesAsHomeTeam = teamCampaign.filter((match) => teamId === match.homeTeam);
  const gamesAsAwayTeam = teamCampaign.filter((match) => teamId === match.awayTeam);

  return {
    teamPoints: calcPoints2(gamesAsHomeTeam, gamesAsAwayTeam),
    totalGames: teamCampaign.length,
    teamWins: calcWins(gamesAsHomeTeam, gamesAsAwayTeam),
    teamDraws: calcDraws(teamCampaign),
    teamLosses: calcLosses(gamesAsHomeTeam, gamesAsAwayTeam),
    goalsFavor: calcGoalsFavor(gamesAsHomeTeam, gamesAsAwayTeam),
    goalsOwn: calcGoalsOwn(gamesAsHomeTeam, gamesAsAwayTeam),
    goalsBalance: calcGoalsBalance2(gamesAsHomeTeam, gamesAsAwayTeam),
    efficiency: calcEfficiency2(totalGames, gamesAsHomeTeam, gamesAsAwayTeam),
  };
};
