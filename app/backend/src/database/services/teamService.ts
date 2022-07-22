import Team from '../models/team';
import { ITeam } from '../interfaces/interfaces';
import ErrorFactory from '../utils/errorFactory';

class TeamService {
  private model: typeof Team;

  constructor() {
    this.model = Team;
  }

  public getAll = async (): Promise<ITeam[]> => {
    const allTeams = await this.model.findAll();
    return allTeams as ITeam[];
  };

  public getById = async (id: number): Promise<ITeam> => {
    const team = await this.model.findOne({ where: { id } });
    if (!team) throw new ErrorFactory(404, 'Team not found');
    return team as ITeam;
  };
}

export default TeamService;
