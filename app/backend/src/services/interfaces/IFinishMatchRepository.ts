import Id from '../../entities/shared/value-objects/Id';

export default interface IFinishMatchRepository {
  perform(matchId: Id): Promise<void>;
}
