import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IGetAllMatchesService from '../services/interfaces/IGetAllMatchesService';
import Match from '../entities/match/Match';
import InvalidQueryError from './errors/InvalidQueryError';
import { ok } from './util/httpControllerResponses';

export default class GetAllMatchesController implements IController {
  constructor(private getAllMatchesService: IGetAllMatchesService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { inProgress: inProgressQuery } = request.query;
    let inProgress: boolean | undefined;

    if (inProgressQuery === 'true') {
      inProgress = true;
    } else if (inProgressQuery === 'false') {
      inProgress = false;
    } else if (inProgressQuery !== undefined) {
      throw new InvalidQueryError('The inProgress query should be "true" or "false"');
    }

    const matches: Match[] = await this.getAllMatchesService.perform(inProgress);
    const dtos = matches.map((match) => match.toMatchDTO());

    return ok(dtos);
  }
}
