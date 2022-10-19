import IUpdateMatchGoalsService from './interfaces/IUpdateMatchGoalsService';
import IUpdateMatchGoalsRepository from './interfaces/IUpdateMatchGoalsRepository';
import IGetMatchByIdRepository from './interfaces/IGetMatchByIdRepository';
import Id from '../entities/shared/value-objects/Id';
import MatchGoalsDTO from '../entities/match/dtos/MatchGoalsDTO';
import Match from '../entities/match/Match';
import TeamGoals from '../entities/match/value-objects/TeamGoals';
import MatchNotFoundError from './errors/MatchNotFoundError';

export default class UpdateMatchGoalsService implements IUpdateMatchGoalsService {
  constructor(
    private updateMatchGoalsRepository: IUpdateMatchGoalsRepository,
    private getMatchByIdRepository: IGetMatchByIdRepository,
  ) {}

  async perform(matchId: Id, matchGoals: MatchGoalsDTO): Promise<{ message: string }> {
    const match: Match | null = await this.getMatchByIdRepository.perform(matchId);;

    if (!match) throw new MatchNotFoundError();

    match.homeTeamGoals = TeamGoals.create(matchGoals.homeTeamGoals);
    match.awayTeamGoals = TeamGoals.create(matchGoals.awayTeamGoals);

    await this.updateMatchGoalsRepository.perform(match);

    return { message: 'Updated' };
  }
}
