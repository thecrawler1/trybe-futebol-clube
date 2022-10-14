import IGetMatchByIdRepository from '../../../services/interfaces/IGetMatchByIdRepository';
import Id from '../../../entities/shared/value-objects/Id';
import Match from '../../../entities/match/Match';
import MatchDTO from '../../../entities/match/dtos/MatchDTO';
import MatchModel from '../../../database/models/Match';

export default class GetMatchByIdRepository implements IGetMatchByIdRepository {
  private matchModel = MatchModel;

  async perform(id: Id): Promise<Match | null> {
    const model: MatchModel | null = await this.matchModel.findByPk(id.value);

    return model
      ? Match.create(model.toJSON() as MatchDTO)
      : null;
  }
}
