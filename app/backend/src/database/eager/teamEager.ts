import Team from '../models/team';
// import Match from '../models/match';
import MatchService from '../services/matchService';

const { Op } = require('sequelize');

class TeamEager {
  private model: typeof Team;

  constructor() {
    this.model = Team;
  }

  // public getTeamCampaign = async (id: number) => {
  //   const teamCampaign = new MatchService().findAll({
  //     where: {
  //       [Op.or]: [
  //         { home_team: id },
  //         { away_team: id }
  //       ]
  //     }
  //   });
  // };
}

export default TeamEager;
