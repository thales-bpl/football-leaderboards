import * as express from 'express';
import LoginRouter from './database/routes/loginRouter';
import TeamRouter from './database/routes/teamRouter';
import MatchRouter from './database/routes/matchRouter';
import LeaderboardRouter from './database/routes/leaderboardRouter';
import errorMiddleware from './database/utils/errorHandler';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', LoginRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', MatchRouter);
    this.app.use('/leaderboard', LeaderboardRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
