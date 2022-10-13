import InvalidTeamNameError from '../errors/InvalidTeamNameError';

export default class TeamName {
  private static minLength = 4;
  private static maxLength = 32;

  private constructor(private _value: string) {}

  static create(teamName: string): TeamName {
    this.validate(teamName);

    return new TeamName(teamName);
  }

  private static validate(teamName: string): void {
    this.validateIfIsString(teamName);
    this.validateIfIsEmpty(teamName);
    this.validateLength(teamName);
  }

  private static validateIfIsString(teamName: string): void {
    if (typeof teamName !== 'string') throw new InvalidTeamNameError();
  }

  private static validateIfIsEmpty(teamName: string): void {
    if (teamName === '') throw new InvalidTeamNameError('The team name is empty');
  }

  private static validateLength(teamName: string): void {
    if (teamName.length < this.minLength) {
      throw new InvalidTeamNameError(`The team name is less than ${this.minLength} characters`);
    }
    if (teamName.length > this.maxLength) {
      throw new InvalidTeamNameError(`The team name is longer than ${this.maxLength} characters`);
    }
  }

  get value(): string {
    return this._value;
  }
}
