import IController from './interfaces/IController';
import IRequest from './interfaces/IRequest';
import IResponse from './interfaces/IResponse';
import ICreateMatchService from '../services/interfaces/ICreateMatchService';
import Match from '../entities/match/Match';
import MatchDTO from '../entities/match/dtos/MatchDTO';
import RequiredFieldNotProvidedError from './errors/RequiredFieldNotProvidedError';
import { created } from './util/httpControllerResponses';

export default class CreateMatchController implements IController {
  constructor(private createMatchService: ICreateMatchService) {}

  async handle(request: IRequest): Promise<IResponse> {
    CreateMatchController.validateFields(request);

    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = request.payload;
    const match: Match = Match.create({
      homeTeam: Number(homeTeam),
      homeTeamGoals: Number(homeTeamGoals),
      awayTeam: Number(awayTeam),
      awayTeamGoals: Number(awayTeamGoals),
      inProgress: true,
    });
    const createdMatch: Match = await this.createMatchService.perform(match);
    const dto: MatchDTO = createdMatch.toMatchDTO();

    return created(dto);
  }

  private static validateFields(request: IRequest): void {
    const requiredFields = ['homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals'];
    const someIsMissing = requiredFields.some((field) => request.payload[field] === undefined);

    if (someIsMissing) throw new RequiredFieldNotProvidedError();
  }
}
