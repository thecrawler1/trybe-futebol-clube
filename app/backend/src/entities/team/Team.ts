import Id from '../shared/value-objects/Id';
import TeamName from './value-objects/TeamName';
import TeamDTO from './dtos/TeamDTO';

export default class Team {
  private _teamName: TeamName;
  private _id?: Id;

  private constructor(teamName: TeamName) {
    this._teamName = teamName;
  }

  static create({ teamName, id }: TeamDTO): Team {
    const team = new Team(TeamName.create(teamName));

    if (id) team._id = Id.create(id);

    return team;
  }

  toTeamDTO(): TeamDTO {
    return {
      id: this.id?.value,
      teamName: this.teamName.value,
    };
  }

  get teamName(): TeamName {
    return this._teamName;
  }

  get id(): Id | undefined {
    return this._id;
  }
}
