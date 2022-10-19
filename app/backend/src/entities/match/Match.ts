import Id from '../shared/value-objects/Id';
import TeamGoals from './value-objects/TeamGoals';
import Team from '../team/Team';
import MatchDTO from './dtos/MatchDTO';

export default class Match {
  private _id?: Id;
  private _homeTeamId: Id;
  private _homeTeamGoals: TeamGoals;
  private _awayTeamId: Id;
  private _awayTeamGoals: TeamGoals;
  private _inProgress: boolean;
  private _teamHome?: Team;
  private _teamAway?: Team;

  private constructor({
    homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
    inProgress,
  } : {
    homeTeamId: Id,
    homeTeamGoals: TeamGoals,
    awayTeamId: Id,
    awayTeamGoals: TeamGoals,
    inProgress: boolean,
  }) {
    this._homeTeamId = homeTeamId;
    this._homeTeamGoals = homeTeamGoals;
    this._awayTeamId = awayTeamId;
    this._awayTeamGoals = awayTeamGoals;
    this._inProgress = inProgress;
  }

  static create(matchDTO: MatchDTO): Match {
    const match = new Match({
      homeTeamId: Id.create(matchDTO.homeTeam),
      homeTeamGoals: TeamGoals.create(matchDTO.homeTeamGoals),
      awayTeamId: Id.create(matchDTO.awayTeam),
      awayTeamGoals: TeamGoals.create(matchDTO.awayTeamGoals),
      inProgress: matchDTO.inProgress,
    });

    if (matchDTO.id) match._id = Id.create(matchDTO.id);
    if (matchDTO.teamHome) match._teamHome = Team.create(matchDTO.teamHome);
    if (matchDTO.teamAway) match._teamAway = Team.create(matchDTO.teamAway);

    return match;
  }

  toMatchDTO(): MatchDTO {
    const dto: MatchDTO = {
      homeTeam: this.homeTeamId.value,
      homeTeamGoals: this.homeTeamGoals.value,
      awayTeam: this.awayTeamId.value,
      awayTeamGoals: this.awayTeamGoals.value,
      inProgress: this.inProgress,
    };

    if (this.id) dto.id = this.id.value;
    if (this.teamHome) dto.teamHome = this.teamHome.toTeamDTO();
    if (this.teamAway) dto.teamAway = this.teamAway.toTeamDTO();

    return dto;
  }

  get id(): Id | undefined {
    return this._id;
  }

  get homeTeamId(): Id {
    return this._homeTeamId;
  }

  get homeTeamGoals(): TeamGoals {
    return this._homeTeamGoals;
  }

  set homeTeamGoals(goals: TeamGoals) {
    this._homeTeamGoals = goals;
  }

  get awayTeamId(): Id {
    return this._awayTeamId;
  }

  get awayTeamGoals(): TeamGoals {
    return this._awayTeamGoals;
  }

  set awayTeamGoals(goals: TeamGoals) {
    this._awayTeamGoals = goals;
  }

  get inProgress(): boolean {
    return this._inProgress;
  }

  get teamHome(): Team | undefined {
    return this._teamHome;
  }

  get teamAway(): Team | undefined {
    return this._teamAway;
  }
}
