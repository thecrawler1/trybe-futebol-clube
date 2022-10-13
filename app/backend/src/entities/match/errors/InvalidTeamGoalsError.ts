import ValidationError from '../../../errors/ValidationError';

export default class InvalidTeamGoalsError extends ValidationError {
  constructor() {
    super('Invalid team goals');

    this.name = 'InvalidTeamGoalsError';
  }
}
