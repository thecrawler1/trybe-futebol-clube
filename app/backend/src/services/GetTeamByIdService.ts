import IGetTeamByIdService from './interfaces/IGetTeamByIdService';
import IGetTeamByIdRepository from './interfaces/IGetTeamByIdRepository';
import Team from '../entities/team/Team';
import Id from '../entities/shared/value-objects/Id';
import TeamNotFoundError from './errors/TeamNotFoundError';

export default class GetTeamByIdService implements IGetTeamByIdService {
  constructor(private getTeamByIdRepository: IGetTeamByIdRepository) {}

  async perform(id: Id): Promise<Team> {
    const team: Team | null = await this.getTeamByIdRepository.perform(id);

    if (!team) throw new TeamNotFoundError();

    return team;
  }
}
