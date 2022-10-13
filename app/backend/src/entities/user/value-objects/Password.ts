import InvalidPasswordError from '../errors/InvalidPasswordError';

export default class Password {
  private static minLength = 6;
  private static maxLength = 16;

  private constructor(private readonly _value: string) {}

  static create(password: string): Password {
    this.validate(password);

    return new Password(password);
  }

  static validate(password: string): void {
    this.validateIfIsString(password);
    this.validateLength(password);
    this.validateIfHasWhiteSpaces(password);
  }

  private static validateIfIsString(password: string): void {
    if (typeof password !== 'string') throw new InvalidPasswordError();
  }

  private static validateLength(password: string): void {
    if (password.length < this.minLength) {
      throw new InvalidPasswordError(`The password is less than ${this.minLength} characters`);
    }
    if (password.length > this.maxLength) {
      throw new InvalidPasswordError(`The password is longer than ${this.maxLength} characters`);
    }
  }

  private static validateIfHasWhiteSpaces(password: string): void {
    if (password.includes(' ')) throw new InvalidPasswordError('The password has white spaces');
  }

  get value(): string {
    return this._value;
  }
}
