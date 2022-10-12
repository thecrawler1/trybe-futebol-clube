import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IGetAllTeamsService from '../services/interfaces/IGetAllTeamsService';
import Team from '../entities/team/Team';
import TeamDTO from '../entities/team/dtos/TeamDTO';
import { ok } from './util/httpControllerResponses';

export default class GetAllTeamsController implements IController {
  constructor(private getAllTeams: IGetAllTeamsService) {}

  async handle(_request: IRequest): Promise<IResponse> {
    const teams: Team[] = await this.getAllTeams.perform();
    const dtos: TeamDTO[] = teams.map((team) => team.toTeamDTO());

    return ok(dtos);
  }
}
