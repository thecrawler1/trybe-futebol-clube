import UnauthorizedError from '../../errors/UnauthorizedError';

export default class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super('Token must be a valid token');

    this.name = 'InvalidTokenError';
  }
}
