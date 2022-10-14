import UnauthorizedError from '../../errors/UnauthorizedError';

export default class MatchWithEqualTeamsError extends UnauthorizedError {
  constructor() {
    super('It is not possible to create a match with two equal teams');

    this.name = 'MatchWithEqualTeamsError';
  }
}
