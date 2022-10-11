import Password from '../../entities/user/value-objects/Password';

export default interface IHashComparer {
  compare(password: Password, hash: string): boolean;
}
