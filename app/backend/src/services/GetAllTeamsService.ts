import IGetAllTeamsService from './interfaces/IGetAllTeamsService';
import IGetAllTeamsRepository from './interfaces/IGetAllTeamsRepository';
import Team from '../entities/team/Team';

export default class GetAllTeamsService implements IGetAllTeamsService {
  constructor(private getAllTeams: IGetAllTeamsRepository) {}

  async perform(): Promise<Team[]> {
    const teams: Team[] = await this.getAllTeams.perform();

    return teams;
  }
}
