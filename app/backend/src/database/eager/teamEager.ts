import Team from '../models/team';
import Match from '../models/match';
import { ITeamCampaign } from '../interfaces/interfaces';

class TeamEager {
  private model: typeof Team;

  constructor() {
    this.model = Team;
  }

  public getAllTeamsCampaign = async (): Promise<ITeamCampaign[]> => {
    const allTeamsCampaign = await this.model.findAll({
      include: [
        {
          model: Match,
          as: 'teamHome',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false },
        },
        {
          model: Match,
          as: 'teamAway',
          attributes: ['awayTeamGoals', 'homeTeamGoals'],
          where: { inProgress: false },
        },
      ],
      attributes: { exclude: ['id'] },
    });

    return allTeamsCampaign as unknown as ITeamCampaign[];
  };
}

export default TeamEager;
