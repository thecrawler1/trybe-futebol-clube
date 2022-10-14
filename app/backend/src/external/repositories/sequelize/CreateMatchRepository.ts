import ICreateMatchRepository from '../../../services/interfaces/ICreateMatchRepository';
import Match from '../../../entities/match/Match';
import MatchDTO from '../../../entities/match/dtos/MatchDTO';
import MatchModel from '../../../database/models/Match';

export default class CreateMatchRepository implements ICreateMatchRepository {
  private matchModel = MatchModel;

  async perform(match: Match): Promise<Match> {
    const model: MatchModel = await this.matchModel.create(match.toMatchDTO());

    return Match.create(model.toJSON() as MatchDTO);
  }
}
