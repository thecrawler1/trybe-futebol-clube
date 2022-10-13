import InvalidEmailError from '../errors/InvalidEmailError';

export default class Email {
  private static readonly regex = new RegExp([
    '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]{1,61}@',
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?',
    '(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
  ].join(''));

  private constructor(private readonly _value: string) {}

  static create(email: string): Email {
    this.validate(email);

    return new Email(email);
  }

  private static validate(email: string): void {
    this.validateIfIsString(email);
    this.validateIfIsEmpty(email);
    this.validateFormat(email);
  }

  private static validateIfIsString(email: string): void {
    if (typeof email !== 'string') throw new InvalidEmailError();
  }

  private static validateIfIsEmpty(email: string): void {
    if (email === '') throw new InvalidEmailError('The email is empty');
  }

  private static validateFormat(email: string): void {
    const isFormatValid = this.regex.test(email);

    if (!isFormatValid) throw new InvalidEmailError();
  }

  get value(): string {
    return this._value;
  }
}
