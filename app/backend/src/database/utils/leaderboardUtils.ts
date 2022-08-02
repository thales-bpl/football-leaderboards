import { ITeamCampaign, IMatchGoals, ILeaderboard } from '../interfaces/interfaces';

const calcGames = (teamHome: IMatchGoals[], teamAway: IMatchGoals[], option?: string): number => {
  if (option === 'home') return teamHome.length;
  if (option === 'away') return teamHome.length;
  return teamHome.length + teamAway.length;
};

const calcPoints = (teamHome: IMatchGoals[], teamAway: IMatchGoals[], option?: string): number => {
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

  if (option === 'home') return pointsAsHome;
  if (option === 'away') return pointsAsAway;
  return pointsAsHome + pointsAsAway;
};

const calcWins = (teamHome: IMatchGoals[], teamAway: IMatchGoals[], option?: string): number => {
  const winsAsHome = teamHome.reduce((prev, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const winsAsAway = teamAway.reduce((prev, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  if (option === 'home') return winsAsHome;
  if (option === 'away') return winsAsAway;
  return winsAsHome + winsAsAway;
};

const calcDraws = (team: ITeamCampaign, option?: string): number => {
  let drawsAsHome = 0;
  let drawsAsAway = 0;

  team.teamHome.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) drawsAsHome += 1;
  });

  team.teamAway.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) drawsAsAway += 1;
  });

  if (option === 'home') return drawsAsHome;
  if (option === 'away') return drawsAsAway;
  return drawsAsHome + drawsAsAway;
};

const calcLosses = (teamHome: IMatchGoals[], teamAway: IMatchGoals[], option?: string): number => {
  const lossesAsHome = teamHome.reduce((prev, curr) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  const lossesAsAway = teamAway.reduce((prev, curr) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return prev + 1;
    return prev;
  }, 0);

  if (option === 'home') return lossesAsHome;
  if (option === 'away') return lossesAsAway;
  return lossesAsHome + lossesAsAway;
};

const calcGoalsFavor = (
  teamHome: IMatchGoals[],
  teamAway: IMatchGoals[],
  option?: string,
): number => {
  const goalsAsHome = teamHome.reduce((prev, curr) => prev + curr.homeTeamGoals, 0);
  const goalsAsAway = teamAway.reduce((prev, curr) => prev + curr.awayTeamGoals, 0);

  if (option === 'home') return goalsAsHome;
  if (option === 'away') return goalsAsAway;
  return goalsAsHome + goalsAsAway;
};

const calcGoalsOwn = (
  teamHome: IMatchGoals[],
  teamAway: IMatchGoals[],
  option?: string,
): number => {
  const ownGoalsAsHome = teamHome.reduce((prev, curr) => prev + curr.awayTeamGoals, 0);
  const ownGoalsAsAway = teamAway.reduce((prev, curr) => prev + curr.homeTeamGoals, 0);

  if (option === 'home') return ownGoalsAsHome;
  if (option === 'away') return ownGoalsAsAway;
  return ownGoalsAsHome + ownGoalsAsAway;
};

const calcGoalsBalance = (
  teamHome: IMatchGoals[],
  teamAway: IMatchGoals[],
  option?: string,
): number => {
  const goalsFavor = calcGoalsFavor(teamHome, teamAway, option);
  const goalsOwn = calcGoalsOwn(teamHome, teamAway, option);

  return goalsFavor - goalsOwn;
};

const calcEfficiency = (
  teamHome: IMatchGoals[],
  teamAway: IMatchGoals[],
  option?: string,
): number => {
  const teamPoints = calcPoints(teamHome, teamAway, option);
  const matchesPlayed = calcGames(teamHome, teamAway, option);

  const efficiency = (teamPoints / (matchesPlayed * 3)) * 100;
  return +efficiency.toFixed(2);
};

const getLeaderboard = (allTeamsCampaign: ITeamCampaign[], option?: string): ILeaderboard[] => {
  const unorderedLeaderboard = allTeamsCampaign.map((team) => ({
    name: team.teamName,
    totalPoints: calcPoints(team.teamHome, team.teamAway, option),
    totalGames: calcGames(team.teamHome, team.teamAway, option),
    teamWins: calcWins(team.teamHome, team.teamAway, option),
    teamDraws: calcDraws(team, option),
    teamLosses: calcLosses(team.teamHome, team.teamAway, option),
    goalsFavor: calcGoalsFavor(team.teamHome, team.teamAway, option),
    goalsOwn: calcGoalsOwn(team.teamHome, team.teamAway, option),
    goalsBalance: calcGoalsBalance(team.teamHome, team.teamAway, option),
    efficiency: calcEfficiency(team.teamHome, team.teamAway, option),
  }));

  return unorderedLeaderboard as unknown as ILeaderboard[];
};

const sortLeaderboard = (leaderboard: ILeaderboard[]) => {
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

export {
  getLeaderboard,
  sortLeaderboard,
};
