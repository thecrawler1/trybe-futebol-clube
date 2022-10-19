import Match from '../../entities/match/Match';

export default interface IUpdateMatchGoalsRepository {
  perform(match: Match): Promise<void>;
}
