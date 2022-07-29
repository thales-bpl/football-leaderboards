import { IMatch /* ITeamStat  */ } from '../interfaces/interfaces';
import Match from '../models/match';
import Team from '../models/team';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Op } = require('sequelize');

const statsMapper = (match: IMatch, teamId: number) => ({
  teamId,
  match,
});

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

  public getTeamCampaign = async (id: number): Promise<IMatch[]> => {
    const teamCampaign = await this.model.findAll({
      where: {
        [Op.or]: [
          { homeTeam: id },
          { awayTeam: id },
        ],
      },
    });

    return teamCampaign as IMatch[];
  };

  public teamStats = async (teamCampaign: IMatch[], teamId: number) => {
    const teamGames = teamCampaign.length;
    // const teamStat = {
    //   teamPoints: 0,
    //   teamWins: 0,
    //   teamDraws: 0,
    //   teamLosses: 0,
    // }

    teamCampaign.reduce((acc, curr) => statsMapper(curr, teamId), {});
    // TO-DO: concluir esse return

    return teamGames;
  };
}

export default MatchEager;
