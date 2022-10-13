import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IGetAllMatchesService from '../services/interfaces/IGetAllMatchesService';
import Match from '../entities/match/Match';
import { ok } from './util/httpControllerResponses';

export default class GetAllMatchesController implements IController {
  constructor(private getAllMatchesService: IGetAllMatchesService) {}

  async handle(request: IRequest): Promise<IResponse> {
    let inProgress: boolean | undefined;

    if (request.query.inProgress === 'true') inProgress = true;
    else if (request.query.inProgress === 'false') inProgress = false;

    const matches: Match[] = await this.getAllMatchesService.perform(inProgress);
    const dtos = matches.map((match) => match.toMatchDTO());

    return ok(dtos);
  }
}
