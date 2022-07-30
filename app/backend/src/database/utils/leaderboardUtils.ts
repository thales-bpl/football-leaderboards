import { ITeamCampaign, IOngoingMatch, ILeaderboard } from '../interfaces/interfaces';

export const calcPoints = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]): number => {
  const pointsAsHome = teamHome.reduce((prev, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return prev + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const pointsAsAway = teamAway.reduce((prev, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return prev + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  return pointsAsHome + pointsAsAway;
};

export const calcWins = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]): number => {
  const winsAsHome = teamHome.reduce((prev, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const winsAsAway = teamAway.reduce((prev, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  return winsAsHome + winsAsAway;
};

export const calcDraws = (team: ITeamCampaign) => {
  let draws = 0;

  team.teamHome.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
  });

  team.teamAway.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
  });

  return draws;
};

export const calcLosses = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]) => {
  const lossesAsHome = teamHome.reduce((prev, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const lossesAsAway = teamAway.reduce((prev, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  return lossesAsHome + lossesAsAway;
};

export const calcGoalsFavor = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]) => {
  const goalsAsHome = teamHome.reduce((prev, curr) => prev + curr.homeTeamGoals, 0);
  const goalsAsAway = teamAway.reduce((prev, curr) => prev + curr.awayTeamGoals, 0);

  return goalsAsHome + goalsAsAway;
};

export const calcGoalsOwn = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]) => {
  const goalsOwnAsHome = teamHome.reduce((prev, curr) => prev + curr.awayTeamGoals, 0);
  const goalsOwnAsAway = teamAway.reduce((prev, curr) => prev + curr.homeTeamGoals, 0);

  return goalsOwnAsHome + goalsOwnAsAway;
};

export const calcGoalsBalance = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]) => {
  const goalsFavor = calcGoalsFavor(teamHome, teamAway);
  const goalsOwn = calcGoalsOwn(teamHome, teamAway);

  return goalsFavor - goalsOwn;
};

export const calcEfficiency = (teamHome: IOngoingMatch[], teamAway: IOngoingMatch[]) => {
  const teamPoints = calcPoints(teamHome, teamAway);
  const matches = teamHome.length + teamAway.length;

  const efficiency = (teamPoints / (matches * 3)) * 100;
  return +efficiency.toFixed(2);
};

export const getLeaderboard = (allTeamsCampaign: ITeamCampaign[]): ILeaderboard[] => {
  const unorderedLeaderboard = allTeamsCampaign.map((team) => ({
    name: team.teamName,
    totalPoints: calcPoints(team.teamHome, team.teamAway),
    totalGames: team.teamHome.length + team.teamAway.length,
    teamWins: calcWins(team.teamHome, team.teamAway),
    teamDraws: calcDraws(team),
    teamLosses: calcLosses(team.teamHome, team.teamAway),
    goalsFavor: calcGoalsFavor(team.teamHome, team.teamAway),
    goalsOwn: calcGoalsOwn(team.teamHome, team.teamAway),
    goalsBalance: calcGoalsBalance(team.teamHome, team.teamAway),
    efficiency: calcEfficiency(team.teamHome, team.teamAway),
  }));

  return unorderedLeaderboard as unknown as ILeaderboard[];
};

export const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
  leaderboard.sort((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) return -1;
    if (teamA.totalPoints < teamB.totalPoints) return 1;
    if (teamA.totalVictories > teamB.totalVictories) return -1;
    if (teamA.totalVictories < teamB.totalVictories) return 1;
    if (teamA.goalsBalance > teamB.goalsBalance) return -1;
    if (teamA.goalsBalance < teamB.goalsBalance) return 1;
    if (teamA.goalsFavor > teamB.goalsFavor) return -1;
    if (teamA.goalsFavor < teamB.goalsFavor) return 1;
    if (teamA.goalsOwn > teamB.goalsOwn) return -1;
    if (teamA.goalsOwn < teamB.goalsOwn) return 1;
    return 0;
  });

  return leaderboard;
};
