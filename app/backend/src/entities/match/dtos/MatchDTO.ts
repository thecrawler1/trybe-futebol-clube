import MatchGoalsDTO from './MatchGoalsDTO';
import TeamDTO from '../../team/dtos/TeamDTO';

export default class Matchdto extends MatchGoalsDTO {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
  teamHome?: TeamDTO;
  teamAway?: TeamDTO;
}
