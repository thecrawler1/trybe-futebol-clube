import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';

import GetUserRoleController from '../controllers/GetUserRoleController';
import IRequest  from '../controllers/interfaces/IRequest';
import IResponse from '../controllers/interfaces/IResponse';
import UserDTO from '../entities/user/dtos/UserDTO';

describe('Get user role controller', function () {
  it('should return the user role and an OK status', async function () {
    const fakeRequest: IRequest = {
      query: {},
      params: {},
      payload: {
        user: <UserDTO> {
          email: 'user@user.com',
          username: 'user',
          role: 'user',
        },
      },
    };
    const getUserRole = new GetUserRoleController();
    const result: IResponse = await getUserRole.handle(fakeRequest);

    expect(result).to.be.deep.equal(<IResponse> {
      statusCode: StatusCodes.OK,
      data: { role: 'user' },
    });
  });
});
