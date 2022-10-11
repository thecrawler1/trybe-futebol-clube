import Email from '../../entities/user/value-objects/Email';
import Password from '../../entities/user/value-objects/Password';

export default interface IAuthenticateUserService {
  perform(email: Email, password: Password): Promise<{ token: string }>;
}
