import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import AuthenticateUserService from '../../../services/AuthenticateUserService';
import IGetUserByEmailRepository from '../../../services/interfaces/IGetUserByEmailRepository';
import IHashComparer from '../../../services/interfaces/IHashComparer';
import User from '../../../entities/user/User';
import IncorrectEmailOrPasswordError from '../../../services/errors/IncorrectEmailOrPasswordError';
import { generateToken } from '../../../services/utils/token';

chai.use(chaiAsPromised);

const { expect } = chai;

class FakeGetUserByEmailRepository implements IGetUserByEmailRepository {
  user?: User;

  async perform(_email: any): Promise<User> {
    if (!this.user) throw new IncorrectEmailOrPasswordError();

    return this.user;
  }
}

class FakeHashComparer implements IHashComparer {
  answer = true;

  compare(_password: any, _hash: string): boolean {
    return this.answer;
  }
}

describe('Authenticate user service', function () {
  let fakeRepository: FakeGetUserByEmailRepository;
  let fakeHashComparer: FakeHashComparer;
  let authenticateUser: AuthenticateUserService;
  let user: User;

  before(function () {
    fakeRepository = new FakeGetUserByEmailRepository();
    fakeHashComparer = new FakeHashComparer();
    authenticateUser = new AuthenticateUserService(fakeRepository, fakeHashComparer);

    user = User.create({
      email: 'user@user.com',
      username: 'username',
      role: 'user',
      id: 1,
      password: '123456',
      passwordHash: 'hash',
    });
  });

  it('should authenticate the user', async function () {
    fakeRepository.user = user;
    fakeHashComparer.answer = true;

    const result = await authenticateUser.perform(user.email, user.password!);
    const token = generateToken(user);

    expect(result).to.be.deep.equal({ token });
  });

  it('should not authenticate the user (incorrect email)', async function () {
    fakeRepository.user = undefined;
    fakeHashComparer.answer = true;

    await expect(authenticateUser.perform(user.email, user.password!)).to.be.eventually
      .rejectedWith(IncorrectEmailOrPasswordError, 'Incorrect email or password');
  });

  it('should not authenticate the user (incorrect password)', async function () {
    fakeRepository.user = user;
    fakeHashComparer.answer = false;

    await expect(authenticateUser.perform(user.email, user.password!)).to.be.eventually
      .rejectedWith(IncorrectEmailOrPasswordError, 'Incorrect email or password');
  });
});
