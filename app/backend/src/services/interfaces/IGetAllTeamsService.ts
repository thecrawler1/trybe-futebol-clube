import Team from '../../entities/team/Team';

export default interface IGetAllTeamsService {
  perform(): Promise<Team[]>;
}
