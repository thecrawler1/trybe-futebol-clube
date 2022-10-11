import IAuthenticateUserService from './interfaces/IAuthenticateUserService';
import IGetUserByEmailRepository from './interfaces/IGetUserByEmailRepository';
import IHashComparer from './interfaces/IHashComparer';
import Email from '../entities/user/value-objects/Email';
import Password from '../entities/user/value-objects/Password';
import User from '../entities/user/User';
import IncorrectEmailOrPasswordError from './errors/IncorrectEmailOrPasswordError';
import { generateToken } from '../utils/token';

export default class AuthenticateUserService implements IAuthenticateUserService {
  constructor(
    private getUserByEmail: IGetUserByEmailRepository,
    private hashComparer: IHashComparer,
  ) {}

  async perform(email: Email, password: Password): Promise<{ token: string }> {
    const user: User | null = await this.getUserByEmail.perform(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    if (!user.passwordHash) {
      throw new Error('[AuthenticateUserService] Repository did not return hash');
    }

    this.validateIfPasswordMatch(password, user.passwordHash);

    return { token: generateToken(user) };
  }

  private validateIfPasswordMatch(password: Password, hash: string): void {
    if (!this.hashComparer.compare(password, hash)) {
      throw new IncorrectEmailOrPasswordError();
    }
  }
}
