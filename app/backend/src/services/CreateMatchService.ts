import ICreateMatchService from './interfaces/ICreateMatchService';
import ICreateMatchRepository from './interfaces/ICreateMatchRepository';
import IGetTeamByIdRepository from './interfaces/IGetTeamByIdRepository';
import Match from '../entities/match/Match';
import Team from '../entities/team/Team';
import MatchWithEqualTeamsError from './errors/MatchWithEqualTeamsError';
import TeamNotFoundError from './errors/TeamNotFoundError';

export default class CreateMatchService implements ICreateMatchService {
  constructor(
    private createMatchRepository: ICreateMatchRepository,
    private getTeamByIdRepository: IGetTeamByIdRepository,
  ) {}

  async perform(match: Match): Promise<Match> {
    CreateMatchService.validateIfTeamsAreEqual(match);
    await this.validateIfTeamsExist(match);

    return this.createMatchRepository.perform(match);
  }

  static validateIfTeamsAreEqual(match: Match): void {
    if (match.homeTeamId.equals(match.awayTeamId)) {
      throw new MatchWithEqualTeamsError();
    }
  }

  async validateIfTeamsExist(match: Match): Promise<void> {
    const homeTeam: Team | null = await this.getTeamByIdRepository.perform(match.homeTeamId);
    const awayTeam: Team | null = await this.getTeamByIdRepository.perform(match.awayTeamId);

    if (!homeTeam || !awayTeam) throw new TeamNotFoundError();
  }
}
