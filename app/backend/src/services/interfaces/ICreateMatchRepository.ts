import Match from '../../entities/match/Match';

export default interface ICreateMatchRepository {
  perform(match: Match): Promise<Match>;
}
