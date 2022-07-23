import { Router } from 'express';
import MatchController from '../controllers/matchController';
import tokenValidator from '../middlewares/tokenValidator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rescue = require('express-rescue');

const router = Router();
const matchController = new MatchController();

router
  .get('/', rescue(matchController.getAll))
  .get('/:id', rescue(matchController.getById))
  .post('/', tokenValidator, rescue(matchController.post))
  .patch('/:id', rescue(matchController.patch))
  .patch('/:id/finish', rescue(matchController.finishMatch));

export default router;
