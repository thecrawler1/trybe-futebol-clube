import IGetAllTeamsRepository from '../../../services/interfaces/IGetAllTeamsRepository';
import Team from '../../../entities/team/Team';
import TeamDTO from '../../../entities/team/dtos/TeamDTO';
import TeamModel from '../../../database/models/Team';

export default class GetAllTeamsRepository implements IGetAllTeamsRepository {
  private teamModel = TeamModel;

  async perform(): Promise<Team[]> {
    const models: TeamModel[] = await this.teamModel.findAll();
    const teams: Team[] = models.map((model) => Team.create(model.toJSON() as TeamDTO));

    return teams;
  }
}
