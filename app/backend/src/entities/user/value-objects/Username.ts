import InvalidUsernameError from '../errors/InvalidUsernameError';

export default class Username {
  private static minLength = 4;
  private static maxLength = 64;

  private constructor(private readonly _value: string) {}

  static create(username: string): Username {
    this.validate(username);

    return new Username(username);
  }

  private static validate(username: string): void {
    this.validateIfIsString(username);
    this.validateIfIsEmpty(username);
    this.validateLength(username);
    this.validateIfHasWhiteSpaces(username);
  }

  private static validateIfIsString(username: string): void {
    if (typeof username !== 'string') throw new InvalidUsernameError();
  }

  private static validateIfIsEmpty(username: string): void {
    if (username === '') {
      throw new InvalidUsernameError('The username is empty');
    }
  }

  private static validateLength(username: string): void {
    if (username.length < this.minLength) {
      throw new InvalidUsernameError(`The username is less than ${this.minLength} characters`);
    }
    if (username.length > this.maxLength) {
      throw new InvalidUsernameError(`The username is longer than ${this.maxLength} characters`);
    }
  }

  private static validateIfHasWhiteSpaces(username: string): void {
    if (username.includes(' ')) {
      throw new InvalidUsernameError('The username has white spaces');
    }
  }

  get value(): string {
    return this._value;
  }
}
