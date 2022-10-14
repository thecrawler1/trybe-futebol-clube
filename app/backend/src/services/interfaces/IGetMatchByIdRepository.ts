import Id from '../../entities/shared/value-objects/Id';
import Match from '../../entities/match/Match';

export default interface IGetMatchByIdRepository {
  perform(matchId: Id): Promise<Match | null>;
}
