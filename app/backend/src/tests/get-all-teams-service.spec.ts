import { expect } from 'chai';

import IGetAllTeamsRepository from '../services/interfaces/IGetAllTeamsRepository';
import GetAllTeamsService from '../services/GetAllTeamsService';
import Team from '../entities/team/Team';

class FakeGetAllTeamsRepository implements IGetAllTeamsRepository {
  async perform(): Promise<Team[]> {
    return [
      Team.create({ id: 1, teamName: 'Team 1' }),
      Team.create({ id: 2, teamName: 'Team 2' }),
    ];
  }
}

describe('Get all teams service', function () {
  const repository = new FakeGetAllTeamsRepository();
  const service = new GetAllTeamsService(repository);

  it('should return all teams', async function () {
    const result = await service.perform();

    expect(result).to.be.deep.equal([
      Team.create({ id: 1, teamName: 'Team 1' }),
      Team.create({ id: 2, teamName: 'Team 2' }),
    ]);
  });
});
