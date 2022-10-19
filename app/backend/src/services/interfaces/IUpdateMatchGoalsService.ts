import Id from '../../entities/shared/value-objects/Id';
import MatchGoalsDTO from '../../entities/match/dtos/MatchGoalsDTO';

export default interface IUpdateMatchGoalsService {
  perform(matchId: Id, matchGoals: MatchGoalsDTO): Promise<{ message: string }>;
}
