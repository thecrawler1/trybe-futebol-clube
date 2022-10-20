import ValidationError from '../../errors/ValidationError';

export default class MatchNotInProgressError extends ValidationError {
  constructor() {
    super('The match is not in progress!');

    this.name = 'MatchNotInProgress';
  }
}
