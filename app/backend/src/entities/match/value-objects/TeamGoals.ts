import InvalidTeamGoalsError from '../errors/InvalidTeamGoalsError';

export default class TeamGoals {
  private _value: number;

  private constructor(goals: number) {
    this._value = goals;
  }

  static create(goals: number): TeamGoals {
    this.validate(goals);

    return new TeamGoals(goals);
  }

  private static validate(goals: number): void {
    if (typeof goals !== 'number' || Number.isNaN(goals) || goals < 0) {
      throw new InvalidTeamGoalsError();
    }
  }

  get value(): number {
    return this._value;
  }
}
