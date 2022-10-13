import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import IGetTeamByIdRepository from '../services/interfaces/IGetTeamByIdRepository';
import GetTeamByIdService from '../services/GetTeamByIdService';
import Team from '../entities/team/Team';
import Id from '../entities/shared/value-objects/Id';
import TeamNotFoundError from '../services/errors/TeamNotFoundError';

chai.use(chaiAsPromised);

const { expect } = chai;

class FakeGetTeamByIdRepository implements IGetTeamByIdRepository {
  result: Team | null;

  async perform(_id: any): Promise<Team | null> {
    return this.result;
  }
}

describe('Get team by id service', function () {
  const repository = new FakeGetTeamByIdRepository();
  const service = new GetTeamByIdService(repository);
  const team = Team.create({ id: 1, teamName: 'Team 1' })
  const id = Id.create(1);

  it('should return a team', async function () {
    repository.result = team;

    const result = await service.perform(id);

    expect(result).to.be.deep.equal(team);
  });

  it('should not return a team (team not found)', async function () {
    repository.result = null;

    await expect(service.perform(id)).to.eventually.be.rejectedWith(TeamNotFoundError);
  });
});
