import Team from '../models/team';
import { ITeam } from '../interfaces/interfaces';

class TeamService {
  private model: typeof Team;

  constructor() {
    this.model = Team;
  }

  public getAll = async (): Promise<ITeam[]> => {
    const allTeams = await this.model.findAll();
    return allTeams as ITeam[];
  };
}

export default TeamService;
