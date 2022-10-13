import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IGetTeamByIdService from '../services/interfaces/IGetTeamByIdService';
import Team from '../entities/team/Team';
import TeamDTO from '../entities/team/dtos/TeamDTO';
import Id from '../entities/shared/value-objects/Id';
import { ok } from './util/httpControllerResponses';

export default class GetTeamByIdController implements IController {
  constructor(private getTeamByIdService: IGetTeamByIdService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const id: Id = Id.create(Number(request.params.id));
    const team: Team = await this.getTeamByIdService.perform(id);
    const dto: TeamDTO = team.toTeamDTO();

    return ok(dto);
  }
}
