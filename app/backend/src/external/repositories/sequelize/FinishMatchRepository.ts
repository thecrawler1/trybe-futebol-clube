import IFinishMatchRepository from '../../../services/interfaces/IFinishMatchRepository';
import Id from '../../../entities/shared/value-objects/Id';
import MatchModel from '../../../database/models/Match';

export default class FinishMatchRepository implements IFinishMatchRepository {
  private matchModel = MatchModel;

  async perform(id: Id): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id: id.value } });
  }
}
