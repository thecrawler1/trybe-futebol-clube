import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import IUpdateMatchGoalsService from '../services/interfaces/IUpdateMatchGoalsService';
import Id from '../entities/shared/value-objects/Id';
import MatchGoalsDTO from '../entities/match/dtos/MatchGoalsDTO';
import RequiredFieldNotProvidedError from './errors/RequiredFieldNotProvidedError';
import { ok } from './util/httpControllerResponses';

export default class UpdateMatchController implements IController {
  constructor(private updateMatchGoalsService: IUpdateMatchGoalsService) {}

  async handle(request: IRequest): Promise<IResponse> {
    UpdateMatchController.validateRequest(request);

    const { id } = request.params;
    const { homeTeamGoals, awayTeamGoals } = request.payload;

    const matchId: Id = Id.create(Number(id));
    const matchGoals: MatchGoalsDTO = {
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
    };

    const { message } = await this.updateMatchGoalsService.perform(matchId, matchGoals);

    return ok({ message });
  }

  private static validateRequest(request: IRequest): void {
    const { homeTeamGoals, awayTeamGoals } = request.payload;

    if (homeTeamGoals === undefined || awayTeamGoals === undefined) {
      throw new RequiredFieldNotProvidedError();
    }
  }
}
