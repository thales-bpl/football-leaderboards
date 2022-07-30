import { ILeaderboard } from '../interfaces/interfaces';
import Match from '../models/match';
import Team from '../models/team';
import TeamService from '../services/teamService';
import { teamCampaignStats } from '../utils/leaderboardUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Op } = require('sequelize');

class MatchEager {
  private model: typeof Match;

  constructor() {
    this.model = Match;
  }

  // Não consigo usar type IMatchResponse[] nessa função. Por conta disso, não consigo tipar o getAll do matchService como IMatchResponse[] também.
  public getAllMatchesPayload = async () => {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  // LEADERBOARD:

  public getTeamCampaign = async (id: number) => {
    const teamCampaign = await this.model.findAll({
      where: {
        [Op.or]: [
          { homeTeam: id },
          { awayTeam: id },
        ],
      },
    });

    return teamCampaign;
  };

  public getCampaigns = async (id: number): Promise<ILeaderboard> => {
    const name = await (await new TeamService().getById(id)).teamName;
    const teamCampaign = await this.model.findAll({
      where: {
        [Op.or]: [
          { homeTeam: id },
          { awayTeam: id },
        ],
      },
    });

    const teamResults = teamCampaignStats(teamCampaign, id);

    return { name, ...teamResults } as unknown as ILeaderboard;
  };

  public getLeaderboard = async (): Promise<ILeaderboard[]> => {
    const leaderboard:object[] = [];
    const allTeams = await new TeamService().getAll();

    console.log('getLeaderboard do matchEager');

    allTeams.forEach((team) => {
      console.log(leaderboard);
      leaderboard.push(this.getCampaigns(team.id as number));
    });

    // aqui: bubble sort esse array leaderboard pra devolver por classificação

    return leaderboard as ILeaderboard[];
  };
}

export default MatchEager;
