import Team from '../../entities/team/Team';
import Id from '../../entities/shared/value-objects/Id';

export default interface IGetTeamByIdService {
  perform(id: Id): Promise<Team>;
}
