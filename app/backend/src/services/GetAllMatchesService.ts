import IGetAllMatchesService from './interfaces/IGetAllMatchesService';
import IGetAllMatchesRepository from './interfaces/IGetAllMatchesRepository';
import Match from '../entities/match/Match';

export default class GetAllMatchesService implements IGetAllMatchesService {
  constructor(private getAllMatchesRepository: IGetAllMatchesRepository) {}

  async perform(inProgress?: boolean): Promise<Match[]> {
    const matches: Match[] = await this.getAllMatchesRepository.perform(inProgress);

    return matches;
  }
}
