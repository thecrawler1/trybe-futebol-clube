import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IFinishMatchService from '../services/interfaces/IFinishMatchService';
import Id from '../entities/shared/value-objects/Id';
import { ok } from './util/httpControllerResponses';

export default class FinishMatchController implements IController {
  constructor(private finishMatchService: IFinishMatchService) {}

  async handle(request: IRequest): Promise<IResponse> {
    const matchId: Id = Id.create(Number(request.params.id));
    const result: { message: string } = await this.finishMatchService.perform(matchId);

    return ok(result);
  }
}
