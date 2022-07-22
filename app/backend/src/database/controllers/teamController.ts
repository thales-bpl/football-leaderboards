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
}

export default TeamController;
