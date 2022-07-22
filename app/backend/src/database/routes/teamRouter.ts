import { Router } from 'express';
import TeamController from '../controllers/teamController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rescue = require('express-rescue');

const router = Router();
const teamController = new TeamController();

router.get('/', rescue(teamController.getAll));

export default router;
