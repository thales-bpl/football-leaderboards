import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  public service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.service.getAll();
    return res.status(200).json(allTeams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamId = Number(id);

    const team = await this.service.getById(teamId);
    return res.status(200).json(team);
  };
}

export default TeamController;
