import ValidationError from '../../errors/ValidationError';

export default class InvalidQueryError extends ValidationError {
  constructor(message = 'Invalid query') {
    super(message);

    this.name = 'InvalidQueryError';
  }
}
