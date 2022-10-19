import IUpdateMatchGoalsRepository from '../../../services/interfaces/IUpdateMatchGoalsRepository';
import Match from '../../../entities/match/Match';
import MatchModel from '../../../database/models/Match';

export default class UpdateMatchGoalsRepository implements IUpdateMatchGoalsRepository {
  private matchModel = MatchModel;

  async perform(match: Match): Promise<void> {
    await this.matchModel.update(
      { homeTeamGoals: match.homeTeamGoals.value, awayTeamGoals: match.awayTeamGoals.value },
      { where: { id: match.id?.value } },
    );
  }
}
