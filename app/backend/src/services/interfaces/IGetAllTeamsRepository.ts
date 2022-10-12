import Team from '../../entities/team/Team';

export default interface IGetAllTeamsRepository {
  perform(): Promise<Team[]>;
}
