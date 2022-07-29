import Match from '../models/match';
import MatchEager from '../eager/matchEager';
import TeamService from './teamService';
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

  public getById = async (id: number): Promise<Match> => {
    const match = await this.model.findOne({ where: { id } });
    if (!match) throw new ErrorFactory(404, 'Match not found');
    return match;
  };

  public post = async (matchData: IMatchReq, inProgress: boolean): Promise<IMatch> => {
    const { homeTeam, awayTeam } = matchData;
    const { id: homeTeamId } = await new TeamService().getById(homeTeam);
    const { id: awayTeamId } = await new TeamService().getById(awayTeam);

    const SAME_TEAMS = 'It is not possible to create a match with two equal teams';
    if (homeTeamId === awayTeamId) throw new ErrorFactory(401, SAME_TEAMS);

    const matchDataProgress = { ...matchData, inProgress };
    const newMatch = await this.model.create(matchDataProgress);
    if (!newMatch) throw new ErrorFactory(400, 'Bad match request');

    // if (!inProgress) await new LeaderboardService().post(newMatch);
    return newMatch;
  };

  public patch = async (id: number, body: IOngoingMatch, option?: boolean): Promise<IMatch> => {
    const { homeTeamGoals, awayTeamGoals } = body;
    const match = await this.getById(id);
    if (option) match.inProgress = option;

    match.set({
      homeTeamGoals,
      awayTeamGoals,
    });

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
