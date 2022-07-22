import { Router } from 'express';
import TeamController from '../controllers/teamController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rescue = require('express-rescue');

const router = Router();
const teamController = new TeamController();

router
  .get('/', rescue(teamController.getAll))
  .get('/:id', rescue(teamController.getById));

export default router;
