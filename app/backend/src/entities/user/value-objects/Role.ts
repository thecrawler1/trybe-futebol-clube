import InvalidRoleError from '../errors/InvalidRoleError';

export enum RoleType {
  user = 'user',
  admin = 'admin',
}

export default class Role {
  private constructor(private readonly _value: RoleType) {}

  static create(role: string): Role {
    this.validate(role);

    return new Role(role as RoleType);
  }

  private static validate(role: string): void {
    const roleExists = role in RoleType;

    if (!roleExists) throw new InvalidRoleError();
  }

  get value(): RoleType {
    return this._value;
  }
}
