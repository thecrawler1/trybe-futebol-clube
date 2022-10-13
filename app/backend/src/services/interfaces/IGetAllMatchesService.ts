import Match from '../../entities/match/Match';

export default interface IGetAllMatchesService {
  perform(inProgress?: boolean): Promise<Match[]>;
}
