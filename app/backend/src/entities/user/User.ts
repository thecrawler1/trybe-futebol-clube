import Id from '../shared/value-objects/Id';
import Email from './value-objects/Email';
import Password from './value-objects/Password';
import Username from './value-objects/Username';
import Role from './value-objects/Role';
import UserDTO from './dtos/UserDTO';

export default class User {
  private _email: Email;
  private _username: Username;
  private _role: Role;
  private _id?: Id;
  private _password?: Password;
  private _passwordHash?: string;

  constructor(email: Email, username: Username, role: Role) {
    this._email = email;
    this._username = username;
    this._role = role;
  }

  static create({ email, username, role, id, password, passwordHash }: UserDTO): User {
    const user = new User(
      Email.create(email),
      Username.create(username),
      Role.create(role),
    );

    if (id) user._id = Id.create(id);
    if (password) user._password = Password.create(password);
    if (passwordHash) user._passwordHash = passwordHash;

    return user;
  }

  toUserDTO(): UserDTO {
    return {
      id: this.id?.value,
      email: this.email.value,
      password: this.password?.value,
      username: this.username.value,
      role: this.role.value,
      passwordHash: this.passwordHash,
    };
  }

  get email(): Email {
    return this._email;
  }

  get username(): Username {
    return this._username;
  }

  get role(): Role {
    return this._role;
  }

  get id(): Id | undefined {
    return this._id;
  }

  get password(): Password | undefined {
    return this._password;
  }

  get passwordHash(): string | undefined {
    return this._passwordHash;
  }
}
