import HomeOrAwayTeam from '../../entities/team/value-objects/HomeOrAwayTeam';
import TeamResultDTO from '../../entities/team/dtos/TeamResultDTO';

export default interface IGetLeaderboardsRepository {
  perform(homeOrAwayTeam: HomeOrAwayTeam): Promise<TeamResultDTO[]>;
}
