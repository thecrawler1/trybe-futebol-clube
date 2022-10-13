import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { StatusCodes } from 'http-status-codes';

import IGetTeamByIdService from '../services/interfaces/IGetTeamByIdService';
import GetTeamByIdController from '../controllers/GetTeamByIdController';
import Team from '../entities/team/Team';
import InvalidIdError from '../entities/shared/errors/InvalidIdError';

chai.use(chaiAsPromised);

const { expect } = chai;

class FakeGetTeamByIdService implements IGetTeamByIdService {
  async perform(_id: any): Promise<Team> {
    return Team.create({ id: 1, teamName: 'Team 1' });
  }
}

describe('Get team by id controller', function () {
  const service = new FakeGetTeamByIdService();
  const controller = new GetTeamByIdController(service);
  const request = { query: {}, params: { id: '1' }, payload: {} };

  it('should return a team', async function () {
    const result = await controller.handle(request);

    expect(result).to.be.deep.equal({
      statusCode: StatusCodes.OK,
      data: { id: 1, teamName: 'Team 1' },
    });
  });
 
  it('should not return a team (id not provided)', async function () {
    const invalidRequest = { ...request, params: {} };

    await expect(controller.handle(invalidRequest)).to.eventually.be.rejectedWith(InvalidIdError);
  });
 
  it('should not return a team (invalid id)', async function () {
    const invalidRequest = { ...request, params: { id: 'a'} };

    await expect(controller.handle(invalidRequest)).to.eventually.be.rejectedWith(InvalidIdError);
  });
});
