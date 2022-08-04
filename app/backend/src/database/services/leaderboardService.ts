import TeamEager from '../eager/teamEager';
import { getLeaderboard, sortLeaderboard } from '../utils/leaderboardUtils';
import { ILeaderboard } from '../interfaces/interfaces';

class LeaderboardService {
  public getLeaderboard = async (option?: string): Promise<ILeaderboard[]> => {
    const leagueData = await new TeamEager().getAllTeamsCampaign();
    const unorderedLeaderboard = getLeaderboard(leagueData, option);
    const leaderboard = sortLeaderboard(unorderedLeaderboard);

    return leaderboard;
  };
}

export default LeaderboardService;
