import ValidationError from '../../../errors/ValidationError';

export default class InvalidTeamNameError extends ValidationError {
  constructor(message = 'The team name is invalid') {
    super(message);

    this.name = 'InvalidTeamNameError';
  }
}
