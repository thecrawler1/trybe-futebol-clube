import IFinishMatchService from './interfaces/IFinishMatchService';
import IFinishMatchRepository from './interfaces/IFinishMatchRepository';
import IGetMatchByIdRepository from './interfaces/IGetMatchByIdRepository';
import Id from '../entities/shared/value-objects/Id';
import Match from '../entities/match/Match';
import MatchNotFoundError from './errors/MatchNotFoundError';

export default class FinishMatchService implements IFinishMatchService {
  constructor(
    private finishMatchRepository: IFinishMatchRepository,
    private getMatchByIdRepository: IGetMatchByIdRepository,
  ) {}

  async perform(matchId: Id): Promise<{ message: string }> {
    this.validateIfMatchExist(matchId);

    await this.finishMatchRepository.perform(matchId);

    return { message: 'Finished' };
  }

  private async validateIfMatchExist(matchId: Id): Promise<void> {
    const match: Match | null = await this.getMatchByIdRepository.perform(matchId);

    if (!match) throw new MatchNotFoundError();
  }
}
