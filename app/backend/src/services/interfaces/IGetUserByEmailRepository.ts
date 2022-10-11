import User from '../../entities/user/User';
import Email from '../../entities/user/value-objects/Email';

export default interface IGetUserByEmailRepository {
  perform(email: Email): Promise<User | null>;
}
