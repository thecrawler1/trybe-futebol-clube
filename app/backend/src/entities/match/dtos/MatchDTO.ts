import TeamDTO from '../../team/dtos/TeamDTO';

export default class Matchdto {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: TeamDTO;
  teamAway?: TeamDTO;
}
