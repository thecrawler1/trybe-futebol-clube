import ValidationError from '../../../errors/ValidationError';

export default class InvalidEmailError extends ValidationError {
  constructor(message = 'The email format is invalid') {
    super(message);

    this.name = 'InvalidEmailError';
  }
}
