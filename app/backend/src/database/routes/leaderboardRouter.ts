import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rescue = require('express-rescue');

const router = Router();
const leaderboardController = new LeaderboardController();

router
  .get('/', rescue(leaderboardController.getLeaderboard))
  .get('/home', rescue(leaderboardController.getLeaderboard))
  .get('/away', rescue(leaderboardController.getLeaderboard))
  .get('/:id', rescue(leaderboardController.getTeamCampaign));

export default router;
