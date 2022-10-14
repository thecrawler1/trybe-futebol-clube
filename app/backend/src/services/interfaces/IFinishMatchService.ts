import Id from '../../entities/shared/value-objects/Id';

export default interface IFinishMatchService {
  perform(matchId: Id): Promise<{ message: string }>;
}
