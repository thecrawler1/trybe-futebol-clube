import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';

import IGetAllTeamsService from '../services/interfaces/IGetAllTeamsService';
import GetAllTeamsController from '../controllers/GetAllTeamsController';
import Team from '../entities/team/Team';

class FakeGetAllTeamsService implements IGetAllTeamsService {
  async perform(): Promise<Team[]> {
    return [
      Team.create({ id: 1, teamName: 'Team 1' }),
      Team.create({ id: 2, teamName: 'Team 2' }),
    ];
  }
}

describe('Get all teams controller', function () {
  const service = new FakeGetAllTeamsService();
  const controller = new GetAllTeamsController(service);
  const request = { query: {}, params: {}, payload: {} };

  it('should return all teams', async function () {
    const result = await controller.handle(request);

    expect(result).to.be.deep.equal({
      statusCode: StatusCodes.OK,
      data: [
        { id: 1, teamName: 'Team 1' },
        { id: 2, teamName: 'Team 2' },
      ],
    })
  });
});
