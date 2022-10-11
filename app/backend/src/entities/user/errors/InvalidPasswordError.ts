import ValidationError from '../../../errors/ValidationError';

export default class InvalidPasswordError extends ValidationError {
  constructor(message = 'The password is invalid') {
    super(message);

    this.name = 'InvalidPasswordError';
  }
}
