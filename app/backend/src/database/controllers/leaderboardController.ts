import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public getLeaderboard = async (req: Request, res: Response) => {
    const urlArray = req.originalUrl.split('/');
    const homeOrAway = urlArray[urlArray.length - 1];

    const leaderboard = await this.service.getLeaderboard(homeOrAway);
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
