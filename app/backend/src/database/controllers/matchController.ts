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

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matchId = id as unknown as number;
    const match = await this.service.getById(matchId);
    return res.status(200).json(match);
  };

  public post = async (req: Request, res: Response) => {
    const { body } = req;
    const newMatch = await this.service.post(body, true);
    return res.status(201).json(newMatch);
  };

  public patch = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const matchId = id as unknown as number;
    const updatedMatch = await this.service.patch(matchId, body, false);
    return res.status(200).json(updatedMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matchId = id as unknown as number;
    const updatedMatch = await this.service.finishMatch(matchId, false);
    return res.status(200).json(updatedMatch);
  };
}

export default MatchController;
