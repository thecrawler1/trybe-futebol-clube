import Password from '../../entities/user/value-objects/Password';

export default interface IHashGenerator {
  generate(password: Password): string;
}
