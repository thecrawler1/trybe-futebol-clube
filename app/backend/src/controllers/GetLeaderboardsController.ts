import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IGetLeaderboardsService from '../services/interfaces/IGetLeaderboardsService';
import HomeOrAwayTeam from '../entities/team/value-objects/HomeOrAwayTeam';
import TeamResultDTO from '../entities/team/dtos/TeamResultDTO';
import { ok } from './util/httpControllerResponses';

export default class GetLeaderboardsController implements IController {
  constructor(private getLeaderboardsService: IGetLeaderboardsService) {}

  async handle(request: IRequest): Promise<IResponse> {
    let homeOrAwayTeam: HomeOrAwayTeam;

    if (request.params.homeOrAwayTeam) {
      homeOrAwayTeam = request.params.homeOrAwayTeam === 'home'
        ? HomeOrAwayTeam.home
        : HomeOrAwayTeam.away;
    } else {
      homeOrAwayTeam = HomeOrAwayTeam.any;
    }

    const leaderboards: TeamResultDTO[] = await this.getLeaderboardsService.perform(homeOrAwayTeam);

    return ok(leaderboards);
  }
}
