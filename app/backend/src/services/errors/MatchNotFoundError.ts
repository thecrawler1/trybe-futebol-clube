import NotFoundError from '../../errors/NotFoundError';

export default class MatchNotFoundError extends NotFoundError {
  constructor() {
    super('There is no match with such id!');

    this.name = 'MatchNotFoundError';
  }
}
