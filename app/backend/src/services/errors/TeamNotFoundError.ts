import NotFoundError from '../../errors/NotFoundError';

export default class TeamNotFoundError extends NotFoundError {
  constructor() {
    super('Team not found');

    this.name = 'TeamNotFoundError';
  }
}
