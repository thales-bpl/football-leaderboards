// import Match from '../models/match';
// import TeamService from './teamService';
import MatchEager from '../eager/matchEager';

class LeaderboardService {
  public getTeamCampaign = async (id: number) => {
    const allMatches = new MatchEager().getTeamCampaign(id);
    return allMatches;
  };
}

export default LeaderboardService;

// body da partida:
// class Match extends Model {
//   homeTeam: number;
//   homeTeamGoals: number;
//   awayTeam: number;
//   awayTeamGoals: number;
//   inProgress: boolean;
// }

// npx sequelize model:generate --name leaderboard --attributes name:string,totalPoints:number,totalGames:number,totalVictories:number,totalDraws:number,totalLosses:number,goalsFavor:number,goalsOwn:number,goalsBalance:number,efficiency:number

// const getAll = async (): Promise<ILeaderboard[]> => {
//   const leaderboard = await this.model.findAll();
//   // TO-DO: remover o teamId desse retorno porque o front não vai usar e provavelmente vai quebrar no avaliador
//   // fazer similar ao match service
//   // Não esquecer de ordenar por posição no champs
//   return leaderboard as ILeaderboard[];
// }

// const getTeamById = async (teamId: number) => {
//   const team = await this.model.findOne({ where: { teamId } });
//   return team;
// };

// const updateStats = async (teamId: number) => {
//   const team = await this.model.getTeamById(teamId);
//   const efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
//   const goalsBalance = team.goalsFavor - team.goalsOwn;

//   team.set({
//     efficiency,
//     goalsBalance,
//   });

//   await team.save();
// };

// const postMatch = async (matchData: Match, homeTeamPoints: number, awayTeamPoints: number) => {
//   const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = matchData;
//   await this.model.increment(
//     { totalGames: 1, where: { teamId: homeTeam } },
//     { totalPoints: homeTeamPoints, where: { teamId: homeTeam } },
//     { goalsFavor: homeTeamGoals, where: { teamId: homeTeam } },
//     { goalsOwn: awayTeamGoals, where: { teamId: homeTeam } },
//     { totalGames: 1, where: { teamId: awayTeam } },
//     { totalPoints: awayTeamPoints, where: { teamId: awayTeam } },
//     { goalsFavor: awayTeamGoals, where: { teamId: awayTeam } },
//     { goalsOwn: homeTeamGoals, where: { teamId: awayTeam } },
//   );

//   await this.updateStats(homeTeam);
//   await this.updateStats(awayTeam);
// };

// const setWinner = (matchData: Match, winner?: number, looser?: number) => {
//   const { homeTeam, awayTeam } = matchData;

//   if (!winner) {
//     await this.model.increment(
//       { totalDraws: 1, where: [{ teamId: homeTeam }, { teamId: awayTeam }]};
//     )
//   }

//   await this.model.increment(
//     { totalVictories: 1, where: { teamId: winner } },
//     { totalLosses: 1, where: { teamId: looser } },
//   )
// };

// const postMatchService = (matchData: Match) => {
//   const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = matchData;
//   if (homeTeamGoals > awayTeamGoals) {
//     await postMatch(matchData, 3, 0);
//     await setWinner(matchData, homeTeam, awayTeam);
//   }
//   if (homeTeamGoals === awayTeamGoals) {
//     await postMatch(matchData, 1, 1);
//     await setWinner(matchData);
//   }
//   if (homeTeamGoals < awayTeamGoals) {
//     await postMatch(matchData, 0, 3);
//     await setWinner(matchData, awayTeam, homeTeam);
//   }
// };
