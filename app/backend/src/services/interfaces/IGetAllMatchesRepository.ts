import Match from '../../entities/match/Match';

export default interface IGetAllMatchesRepository {
  perform(inProgress?: boolean): Promise<Match[]>;
}
