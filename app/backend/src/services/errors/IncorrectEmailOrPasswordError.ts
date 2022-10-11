import UnauthorizedError from '../../errors/UnauthorizedError';

export default class IncorrectEmailOrPasswordError extends UnauthorizedError {
  constructor() {
    super('Incorrect email or password');
  }
}
