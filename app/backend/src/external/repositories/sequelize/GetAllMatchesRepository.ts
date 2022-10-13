import { FindOptions } from 'sequelize';

import IGetAllMatchesRepository from '../../../services/interfaces/IGetAllMatchesRepository';
import Match from '../../../entities/match/Match';
import MathDTO from '../../../entities/match/dtos/MatchDTO';
import MatchModel from '../../../database/models/Match';

export default class GetAllMatchesRepository implements IGetAllMatchesRepository {
  private matchModel = MatchModel;

  async perform(inProgress?: boolean): Promise<Match[]> {
    const findOptions: FindOptions = {
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    };

    if (inProgress !== undefined) findOptions.where = { inProgress };

    const models: MatchModel[] = await this.matchModel.findAll(findOptions);
    const matches = models.map((model) => Match.create(model.toJSON() as MathDTO));

    return matches;
  }
}
