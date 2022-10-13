import IGetTeamByIdRepository from '../../../services/interfaces/IGetTeamByIdRepository';
import Team from '../../../entities/team/Team';
import TeamDTO from '../../../entities/team/dtos/TeamDTO';
import Id from '../../../entities/shared/value-objects/Id';
import TeamModel from '../../../database/models/Team';

export default class GetTeamByIdRepository implements IGetTeamByIdRepository {
  private teamModel = TeamModel;

  async perform(id: Id): Promise<Team | null> {
    const model: TeamModel | null = await this.teamModel.findByPk(id.value);

    if (!model) return null;

    return Team.create(model.toJSON() as TeamDTO);
  }
}
