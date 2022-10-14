import NotFoundError from '../../errors/NotFoundError';

export default class TeamNotFoundError extends NotFoundError {
  constructor() {
    super('There is no team with such id!');

    this.name = 'TeamNotFoundError';
  }
}
