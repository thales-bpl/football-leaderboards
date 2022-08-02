import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public getTeamCampaign = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamId = id as unknown as number;

    const teamData = await this.service.getTeamCampaign(teamId);
    return res.status(200).json(teamData);
  };

  public getLeaderboard = async (req: Request, res: Response) => {
    // const URL = newWindow.location.href;
    // not working: it throws an error.
    const { home, away } = req.params;

    if (home) {
      const leaderboard = await this.service.getLeaderboard(home);
      return res.status(200).json(leaderboard);
    }

    if (away) {
      const leaderboard = await this.service.getLeaderboard(away);
      return res.status(200).json(leaderboard);
    }

    const leaderboard = await this.service.getLeaderboard();
    return res.status(200).json(leaderboard);
  };
  // public getLeaderboardAsHome = async (_req: Request, res: Response) => {
  //   const leaderboard = await this.service.getLeaderboard('home');
  //   return res.status(200).json(leaderboard);
  // };

  // public getLeaderboardAsAway = async (_req: Request, res: Response) => {
  //   const leaderboard = await this.service.getLeaderboard('away');
  //   return res.status(200).json(leaderboard);
  // }
}

export default LeaderboardController;
