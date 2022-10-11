import ValidationError from '../../../errors/ValidationError';

export default class InvalidUsernameError extends ValidationError {
  constructor(message = 'The username is invalid') {
    super(message);

    this.name = 'InvalidUsernameError';
  }
}
