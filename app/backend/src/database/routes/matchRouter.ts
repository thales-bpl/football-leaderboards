import { Router } from 'express';
import MatchController from '../controllers/matchController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rescue = require('express-rescue');

const router = Router();
const matchController = new MatchController();

router
  .get('/', rescue(matchController.getAll))
  .post('/', rescue(matchController.post));

export default router;
