import Match from '../models/match';
import MatchEager from '../eager/matchEager';

class MatchService {
  private model: typeof Match;

  constructor() {
    this.model = Match;
  }

  public getAll = async () => {
    const allMatches = new MatchEager().getAllMatchesPayload();
    return allMatches;
  };
}

export default MatchService;
