import TeamEager from '../eager/teamEager';
import MatchService from './matchService';
import { getLeaderboard, sortLeaderboard } from '../utils/leaderboardUtils';

class LeaderboardService {
  public getTeamCampaign = async (id: number) => {
    const allMatches = new MatchService().getTeamCampaign(id);
    return allMatches;
  };

  public getLeaderboard = async (option?: string) => {
    const leagueData = await new TeamEager().getAllTeamsCampaign();
    const unorderedLeaderboard = getLeaderboard(leagueData, option);
    const leaderboard = sortLeaderboard(unorderedLeaderboard);

    return leaderboard;
  };
}

export default LeaderboardService;
