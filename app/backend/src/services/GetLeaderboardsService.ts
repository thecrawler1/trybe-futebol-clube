import IGetLeaderboardsService from './interfaces/IGetLeaderboardsService';
import IGetLeaderboardsRepository from './interfaces/IGetLeaderboardsRepository';
import HomeOrAwayTeam from '../entities/team/value-objects/HomeOrAwayTeam';
import TeamResultDTO from '../entities/team/dtos/TeamResultDTO';

export default class GetLeaderboardsService implements IGetLeaderboardsService {
  constructor(private getLeaderboardsRepository: IGetLeaderboardsRepository) {}

  perform(homeOrAwayTeam: HomeOrAwayTeam): Promise<TeamResultDTO[]> {
    return this.getLeaderboardsRepository.perform(homeOrAwayTeam);
  }
}
