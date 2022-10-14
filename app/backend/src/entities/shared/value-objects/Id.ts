import InvalidIdError from '../errors/InvalidIdError';

export default class Id {
  private constructor(private readonly _value: number) {}

  static create(id: number): Id {
    this.validate(id);

    return new Id(id);
  }

  private static validate(id: number): void {
    if (typeof id !== 'number' || Number.isNaN(id) || id < 0) throw new InvalidIdError();
  }

  equals(id: Id): boolean {
    return this.value === id.value;
  }

  get value(): number {
    return this._value;
  }
}
