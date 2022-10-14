import Match from '../../entities/match/Match';

export default interface ICreateMatchService {
  perform(match: Match): Promise<Match>;
}
