import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { StatusCodes } from 'http-status-codes';

import IAuthenticateUserService from '../../../services/interfaces/IAuthenticateUserService';
import AuthenticateUserController from '../../../controllers/AuthenticateUserController';
import IRequest from '../../../controllers/interfaces/IRequest';
import ValidationError from '../../../errors/ValidationError';

chai.use(chaiAsPromised);

const { expect } = chai;

class FakeAuthenticateUserService implements IAuthenticateUserService {
  async perform(_email: any, _password: any): Promise<{ token: string }> {
    return { token: 'token' };
  }
}

describe('Authenticate user controller', function () {
  let authenticateUserService: FakeAuthenticateUserService;
  let authenticateUserController: AuthenticateUserController;
  let request: IRequest;

  before(function () {
    authenticateUserService = new FakeAuthenticateUserService();
    authenticateUserController = new AuthenticateUserController(authenticateUserService);
    request = { params: {}, query: {}, payload: { email: 'user@user.com', password: '123456' } };
  });

  it('should authenticate the user', async function () {
    const result = await authenticateUserController.handle(request);

    expect(result).to.be.deep.equal({ statusCode: StatusCodes.OK, data: { token: 'token' } });
  });

  it('should not authenticate the user (email not provided)', async function () {
    request.payload.email = undefined;

    await expect(authenticateUserController.handle(request)).to.eventually.be.rejectedWith(
      ValidationError,
      'All fields must be filled'
    );
  });

  it('should not authenticate the user (password not provided)', async function () {
    request.payload.email = 'user@user.com';
    request.payload.password = undefined;

    await expect(authenticateUserController.handle(request)).to.eventually.be.rejectedWith(
      ValidationError,
      'All fields must be filled'
    );
  });
});
