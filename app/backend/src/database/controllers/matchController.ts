import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  public service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const allMatches = await this.service.getAll();
    return res.status(200).json(allMatches);
  };

  public post = async (req: Request, res: Response) => {
    const { body } = req;
    const newMatch = await this.service.post(body, true);
    return res.status(201).json(newMatch);
  };
}

export default MatchController;
