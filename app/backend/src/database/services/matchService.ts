import Match from '../models/match';
import MatchEager from '../eager/matchEager';
import { IMatch, IMatchReq } from '../interfaces/interfaces';
import ErrorFactory from '../utils/errorFactory';

class MatchService {
  private model: typeof Match;

  constructor() {
    this.model = Match;
  }

  public getAll = async () => {
    const allMatches = new MatchEager().getAllMatchesPayload();
    return allMatches;
  };

  public post = async (matchData: IMatchReq, inProgress: boolean): Promise<IMatch> => {
    const matchDataProgress = { ...matchData, inProgress };
    const newMatch = await this.model.create(matchDataProgress);
    if (!newMatch) throw new ErrorFactory(400, 'Bad Match Request');
    return newMatch;
  };
}

export default MatchService;
