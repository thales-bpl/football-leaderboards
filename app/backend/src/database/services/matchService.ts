import Match from '../models/match';
import MatchEager from '../eager/matchEager';
import { IMatch, IMatchReq, IOngoingMatch } from '../interfaces/interfaces';
import ErrorFactory from '../utils/errorFactory';

class MatchService {
  private model: typeof Match;

  constructor() {
    this.model = Match;
  }

  public getAll = async (option?: boolean) => {
    if (option) {
      const allMatches = await this.model.findAll();
      return allMatches;
    }

    const allMatches = new MatchEager().getAllMatchesPayload();
    return allMatches;
  };

  public getById = async (id: number) => {
    const match = await this.model.findOne({ where: { id } });
    if (!match) throw new ErrorFactory(404, 'Match not found');
    return match;
  };

  public post = async (matchData: IMatchReq, inProgress: boolean): Promise<IMatch> => {
    const homeTeam = this.getById(matchData.homeTeam);
    const awayTeam = this.getById(matchData.awayTeam);

    const EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';
    if (awayTeam === homeTeam) throw new ErrorFactory(401, EQUAL_TEAMS);
    if (!homeTeam || !awayTeam) throw new ErrorFactory(404, 'There is no team with such id!');

    const matchDataProgress = { ...matchData, inProgress };
    const newMatch = await this.model.create(matchDataProgress);
    if (!newMatch) throw new ErrorFactory(400, 'Bad match request');
    return newMatch;
  };

  public patch = async (id: number, body: IOngoingMatch, option: boolean): Promise<object> => {
    const { homeTeamGoals, awayTeamGoals } = body;
    const match = await this.getById(id);

    match.set({
      homeTeamGoals,
      awayTeamGoals,
    });

    match.inProgress = option;
    await match.save();

    return match;
  };

  public finishMatch = async (id: number, option: boolean): Promise<object> => {
    const match = await this.getById(id);
    match.inProgress = option;
    await match.save();

    return { message: 'Finished' };
  };
}

export default MatchService;
