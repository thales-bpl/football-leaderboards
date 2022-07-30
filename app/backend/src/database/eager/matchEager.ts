import Match from '../models/match';
import Team from '../models/team';

class MatchEager {
  private model: typeof Match;

  constructor() {
    this.model = Match;
  }

  // Não consigo usar type IMatchResponse[] nessa função. Por conta disso, não consigo tipar o getAll do matchService como IMatchResponse[] também.
  public getAllMatchesPayload = async () => {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };
}

export default MatchEager;
