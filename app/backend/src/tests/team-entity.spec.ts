import { expect } from 'chai';

import Team from '../entities/team/Team';
import TeamDTO from '../entities/team/dtos/TeamDTO';
import InvalidIdError from '../entities/shared/errors/InvalidIdError';
import InvalidTeamNameError from '../entities/team/errors/InvalidTeamNameError';

describe('Team entity', function () {
  const validTeamDTO: TeamDTO = {
    id: 1,
    teamName: 'Team FC',
  };

  it('should create a team', function () {
    const team = Team.create(validTeamDTO);

    expect(team.id?.value).to.be.equal(1);
    expect(team.teamName.value).to.be.equal('Team FC');
  });

  it('should not create a team (negative id)', function () {
    const createTeam = () => Team.create({ ...validTeamDTO, id: -1 });

    expect(createTeam).to.throw(InvalidIdError, 'Invalid Id');
  });

  it('should not create a team (empty team name)', function () {
    const createTeam = () => Team.create({ teamName: '' });

    expect(createTeam).to.throw(InvalidTeamNameError, 'The team name is empty');
  });

  it('should not create a team (team name too short)', function () {
    const createTeam = () => Team.create({ teamName: 'abc' });

    expect(createTeam).to.throw(InvalidTeamNameError, 'The team name is less than 4 characters');
  });

  it('should not create a team (team name too long)', function () {
    let teamName = '';
    for (let i = 0; i < 33; i++) teamName += 'c';

    const createTeam = () => Team.create({ teamName });

    expect(createTeam).to.throw(InvalidTeamNameError, 'The team name is longer than 32 characters');
  });
});
